/*
 * Notebook Navigator - Plugin for Obsidian
 * Copyright (c) 2025 Johan Sanneblad
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { App, Modal, setIcon, getIconIds } from 'obsidian';
import { MetadataService } from '../services/MetadataService';
import { strings } from '../i18n';
import { ItemType } from '../types';
import { isEmoji } from '../utils/iconUtils';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { EmojiPicker } from '../components/EmojiPicker';

/**
 * Icon picker modal for selecting custom folder icons and emojis
 * Features tabbed interface with separate Lucide icons and emoji pickers
 * 
 * Features:
 * - Tabbed interface: Icons tab (Lucide) and Emoji tab
 * - Icons tab: Shows recently used icons when no search term is entered, live search, grid layout
 * - Emoji tab: Simple text input for any valid emoji character plus recently used emojis
 * - Keyboard navigation support for both tabs
 * - Persists recently used items across sessions
 * - Icons tab limits search results to 50 items for performance
 * 
 * The modal supports both Lucide icons via Obsidian's getIconIds() API
 * and any Unicode emoji characters for enhanced folder customization.
 */
export class IconPickerModal extends Modal {
    private metadataService: MetadataService;
    private itemPath: string;
    private itemType: typeof ItemType.FOLDER | typeof ItemType.TAG;
    private searchInput: HTMLInputElement;
    private resultsContainer: HTMLDivElement;
    private allIcons: string[];
    private recentlyUsedIcons: string[];
    private recentlyUsedEmojis: string[];
    private focusedIndex: number = -1;
    private gridColumns: number = 5;
    private searchInputKeydownHandler: ((e: KeyboardEvent) => void) | null = null;
    private contentElKeydownHandler: ((e: KeyboardEvent) => void) | null = null;
    private searchDebounceTimer: NodeJS.Timeout | null = null;
    private activeTab: 'icons' | 'emojis' = 'icons';
    private tabsContainer: HTMLDivElement;
    private reactRoot: Root | null = null;

    /** Callback function invoked when an icon is selected */
    public onChooseIcon: (iconId: string | null) => void;

    /**
     * Creates a new icon picker modal
     * @param app - The Obsidian app instance
     * @param metadataService - The metadata service for managing folder/tag icons
     * @param itemPath - Path of the folder or tag to set icon for
     * @param recentlyUsedIcons - List of recently used icon IDs and emojis
     * @param itemType - Whether this is for a folder or tag
     */
    constructor(app: App, metadataService: MetadataService, itemPath: string, recentlyUsedIcons: string[] = [], itemType: typeof ItemType.FOLDER | typeof ItemType.TAG = ItemType.FOLDER) {
        super(app);
        this.metadataService = metadataService;
        this.itemPath = itemPath;
        this.itemType = itemType;
        
        // Get all available icons
        this.allIcons = getIconIds();
        
        // Separate recently used items into icons and emojis
        this.recentlyUsedIcons = recentlyUsedIcons
            .filter(item => !isEmoji(item) && this.allIcons.includes(item));
        this.recentlyUsedEmojis = recentlyUsedIcons
            .filter(item => isEmoji(item));
    }

    /**
     * Called when the modal is opened
     * Sets up tabs, search input and results container
     * Starts on Icons tab by default
     */
    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass('nn-icon-picker-modal');

        // Create tabs
        this.createTabs();

        // Create search input (hidden when emoji tab is active)
        const searchContainer = contentEl.createDiv('nn-icon-search-container');
        this.searchInput = searchContainer.createEl('input', {
            type: 'text',
            placeholder: strings.modals.iconPicker.searchPlaceholder,
            cls: 'nn-icon-search-input'
        });

        // Create results container
        this.resultsContainer = contentEl.createDiv('nn-icon-results-container');

        // Set up search functionality with debouncing for better performance
        this.searchInput.addEventListener('input', () => {
            if (this.searchDebounceTimer) {
                clearTimeout(this.searchDebounceTimer);
            }
            this.searchDebounceTimer = setTimeout(() => {
                this.updateResults();
            }, 150);
        });

        // Set up keyboard navigation
        this.setupKeyboardNavigation();

        // Focus search input initially
        this.searchInput.focus();

        // Show initial results
        this.updateResults();
    }

    /**
     * Called when the modal is closed
     * Cleans up the modal content and removes event listeners
     */
    onClose() {
        // Clear debounce timer
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = null;
        }
        
        // Cleanup React root
        if (this.reactRoot) {
            this.reactRoot.unmount();
            this.reactRoot = null;
        }
        
        // Remove event listeners to prevent memory leak
        if (this.searchInputKeydownHandler && this.searchInput) {
            this.searchInput.removeEventListener('keydown', this.searchInputKeydownHandler);
            this.searchInputKeydownHandler = null;
        }
        if (this.contentElKeydownHandler) {
            this.contentEl.removeEventListener('keydown', this.contentElKeydownHandler);
            this.contentElKeydownHandler = null;
        }
        
        const { contentEl } = this;
        contentEl.empty();
    }

    /**
     * Creates the tab interface
     */
    private createTabs() {
        this.tabsContainer = this.contentEl.createDiv('nn-icon-tabs-container');
        
        const iconsTab = this.tabsContainer.createDiv('nn-icon-tab');
        iconsTab.setText('Icons');
        if (this.activeTab === 'icons') {
            iconsTab.addClass('nn-icon-tab--active');
        }
        iconsTab.addEventListener('click', () => this.switchTab('icons'));
        
        const emojisTab = this.tabsContainer.createDiv('nn-icon-tab');
        emojisTab.setText('Emojis');
        if (this.activeTab === 'emojis') {
            emojisTab.addClass('nn-icon-tab--active');
        }
        emojisTab.addEventListener('click', () => this.switchTab('emojis'));
    }

    /**
     * Switches between icon and emoji tabs
     */
    private switchTab(tab: 'icons' | 'emojis') {
        this.activeTab = tab;
        
        // Update tab appearance
        const tabs = this.tabsContainer.querySelectorAll('.nn-icon-tab');
        tabs.forEach((tabEl, index) => {
            const element = tabEl as HTMLElement;
            if ((index === 0 && tab === 'icons') || (index === 1 && tab === 'emojis')) {
                element.classList.add('nn-icon-tab--active');
            } else {
                element.classList.remove('nn-icon-tab--active');
            }
        });
        
        // Update visibility of search input
        const searchContainer = this.contentEl.querySelector('.nn-icon-search-container') as HTMLElement;
        if (searchContainer) {
            searchContainer.style.display = tab === 'icons' ? 'block' : 'none';
        }
        
        // Reset search
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        
        // Update results only if container exists
        if (this.resultsContainer) {
            this.updateResults();
        }
        
        // Focus appropriate element
        if (tab === 'icons' && this.searchInput) {
            this.searchInput.focus();
        }
    }

    /**
     * Sets up keyboard navigation for the modal
     * Tab/Shift+Tab moves between search and grid
     * Arrow keys navigate within the grid
     */
    private setupKeyboardNavigation() {
        // Handle Tab key on search input
        this.searchInputKeydownHandler = (e) => {
            if (e.key === 'Tab') {
                if (!e.shiftKey) {
                    // Tab: Move to grid
                    e.preventDefault();
                    this.focusFirstIcon();
                } else {
                    // Shift+Tab: Prevent default to avoid unexpected behavior
                    e.preventDefault();
                    // Just keep focus on search input
                }
            }
        };
        this.searchInput.addEventListener('keydown', this.searchInputKeydownHandler);

        // Handle keyboard navigation in the modal
        this.contentElKeydownHandler = (e) => {
            const iconItems = Array.from(this.resultsContainer.querySelectorAll('.nn-icon-item')) as HTMLElement[];
            if (iconItems.length === 0) return;

            const currentFocused = document.activeElement as HTMLElement;
            const isInGrid = currentFocused?.classList.contains('nn-icon-item');

            if (isInGrid) {
                const currentIndex = iconItems.indexOf(currentFocused);
                let newIndex = currentIndex;

                switch (e.key) {
                    case 'Tab':
                        e.preventDefault();
                        if (e.shiftKey) {
                            // Shift+Tab: Go back to search
                            this.searchInput.focus();
                            this.focusedIndex = -1;
                        }
                        // Regular Tab: Do nothing (prevent tabbing through icons)
                        break;

                    case 'ArrowLeft':
                        e.preventDefault();
                        if (currentIndex % this.gridColumns > 0) {
                            newIndex = currentIndex - 1;
                        }
                        break;

                    case 'ArrowRight':
                        e.preventDefault();
                        if (currentIndex % this.gridColumns < this.gridColumns - 1 && currentIndex < iconItems.length - 1) {
                            newIndex = currentIndex + 1;
                        }
                        break;

                    case 'ArrowUp':
                        e.preventDefault();
                        if (currentIndex >= this.gridColumns) {
                            newIndex = currentIndex - this.gridColumns;
                        }
                        break;

                    case 'ArrowDown':
                        e.preventDefault();
                        if (currentIndex + this.gridColumns < iconItems.length) {
                            newIndex = currentIndex + this.gridColumns;
                        }
                        break;

                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        const iconId = currentFocused.getAttribute('data-icon-id');
                        if (iconId) {
                            this.selectIcon(iconId);
                        }
                        break;
                }

                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < iconItems.length) {
                    iconItems[newIndex].focus();
                    this.focusedIndex = newIndex;
                    
                    // Ensure the focused element is fully visible
                    this.ensureIconVisible(iconItems[newIndex]);
                }
            }
        };
        this.contentEl.addEventListener('keydown', this.contentElKeydownHandler);
    }

    /**
     * Focuses the first icon in the grid
     */
    private focusFirstIcon() {
        const firstIcon = this.resultsContainer.querySelector('.nn-icon-item') as HTMLElement;
        if (firstIcon) {
            firstIcon.focus();
            this.focusedIndex = 0;
            this.ensureIconVisible(firstIcon);
        }
    }

    /**
     * Ensures an icon element is fully visible in the scrollable container
     * @param iconElement - The icon element to make visible
     */
    private ensureIconVisible(iconElement: HTMLElement) {
        const container = this.resultsContainer;
        const containerRect = container.getBoundingClientRect();
        const elementRect = iconElement.getBoundingClientRect();
        
        // Add some padding to ensure the focus outline is fully visible
        const padding = 8;
        
        // Check if element is above the visible area
        if (elementRect.top < containerRect.top + padding) {
            container.scrollTop -= (containerRect.top - elementRect.top + padding);
        }
        
        // Check if element is below the visible area
        if (elementRect.bottom > containerRect.bottom - padding) {
            container.scrollTop += (elementRect.bottom - containerRect.bottom + padding);
        }
    }

    /**
     * Updates the displayed content based on active tab
     * Icons tab: Shows recently used icons when search is empty, filters and displays matching icons when searching (limited to 50 items)
     * Emoji tab: Renders React emoji picker component with text input and recently used emojis
     */
    private updateResults() {
        if (!this.resultsContainer) {
            return;
        }
        
        this.resultsContainer.empty();
        this.focusedIndex = -1;
        
        // Cleanup existing React root
        if (this.reactRoot) {
            this.reactRoot.unmount();
            this.reactRoot = null;
        }
        
        if (this.activeTab === 'emojis') {
            // Render emoji picker using React
            const emojiContainer = this.resultsContainer.createDiv('nn-emoji-picker-container');
            this.reactRoot = createRoot(emojiContainer);
            this.reactRoot.render(
                React.createElement(EmojiPicker, {
                    onSelectEmoji: (emoji: string) => this.selectIcon(emoji),
                    recentlyUsedEmojis: this.recentlyUsedEmojis
                })
            );
            return;
        }
        
        // Icons tab logic (existing code)
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show only recently used icons
            if (this.recentlyUsedIcons.length > 0) {
                const header = this.resultsContainer.createDiv('nn-icon-section-header');
                header.setText(strings.modals.iconPicker.recentlyUsedHeader);
                
                const grid = this.resultsContainer.createDiv('nn-icon-grid');
                this.recentlyUsedIcons.forEach(iconId => {
                    this.createIconItem(iconId, grid);
                });
            } else {
                const emptyMessage = this.resultsContainer.createDiv('nn-icon-empty-message');
                emptyMessage.setText(strings.modals.iconPicker.emptyStateSearch);
            }
        } else {
            // Filter and show matching icons
            const matchingIcons = this.allIcons.filter(iconId => {
                const iconName = this.getIconDisplayName(iconId);
                return iconName.toLowerCase().includes(searchTerm) || 
                       iconId.toLowerCase().includes(searchTerm);
            });

            if (matchingIcons.length > 0) {
                const grid = this.resultsContainer.createDiv('nn-icon-grid');
                // Limit to first 50 results for performance
                matchingIcons.slice(0, 50).forEach(iconId => {
                    this.createIconItem(iconId, grid);
                });
                
                if (matchingIcons.length > 50) {
                    const moreMessage = this.resultsContainer.createDiv('nn-icon-more-message');
                    moreMessage.setText(strings.modals.iconPicker.showingResultsInfo.replace('{count}', matchingIcons.length.toString()));
                }
            } else {
                const emptyMessage = this.resultsContainer.createDiv('nn-icon-empty-message');
                emptyMessage.setText(strings.modals.iconPicker.emptyStateNoResults);
            }
        }
    }

    /**
     * Creates a clickable icon item in the grid
     * @param iconId - The Lucide icon identifier
     * @param container - The parent container to add the icon to
     */
    private createIconItem(iconId: string, container: HTMLElement) {
        const iconItem = container.createDiv('nn-icon-item');
        iconItem.setAttribute('data-icon-id', iconId);
        
        // Icon preview
        const iconPreview = iconItem.createDiv('nn-icon-item-preview');
        setIcon(iconPreview, iconId);
        
        // Icon name
        const iconName = iconItem.createDiv('nn-icon-item-name');
        iconName.setText(this.getIconDisplayName(iconId));
        
        // Click handler
        iconItem.addEventListener('click', () => {
            this.selectIcon(iconId);
        });
        
        // Make focusable
        iconItem.setAttribute('tabindex', '0');
    }

    /**
     * Converts icon ID to a human-readable display name
     * Removes 'lucide-' prefix and converts kebab-case to Title Case
     * @param iconId - The icon identifier (e.g., 'folder-open')
     * @returns Human-readable name (e.g., 'Folder Open')
     */
    private getIconDisplayName(iconId: string): string {
        // Remove lucide- prefix if present
        let name = iconId.replace(/^lucide-/, '');
        
        // Convert kebab-case to Title Case
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Handles icon selection
     * Updates recently used icons, saves the selection, and closes the modal
     * @param iconId - The selected icon identifier
     */
    private async selectIcon(iconId: string) {
        // Set the icon based on item type
        if (this.itemType === ItemType.TAG) {
            await this.metadataService.setTagIcon(this.itemPath, iconId);
        } else {
            await this.metadataService.setFolderIcon(this.itemPath, iconId);
        }

        // Notify callback and close
        this.onChooseIcon?.(iconId);
        this.close();
    }
}