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

import { TFile, TFolder, MetadataCache } from 'obsidian';
import type { SortOption, NotebookNavigatorSettings } from '../settings';
import { DateUtils } from './DateUtils';
import { NavigationItemType, ItemType } from '../types';

/**
 * Available sort options in order they appear in menus
 */
export const SORT_OPTIONS: SortOption[] = [
    'modified-desc',
    'modified-asc',
    'created-desc',
    'created-asc',
    'title-asc',
    'title-desc'
];

/**
 * Determines the effective sort option for a given context
 * @param settings - Plugin settings
 * @param selectionType - Whether folder or tag is selected
 * @param selectedFolder - The currently selected folder (if any)
 * @param selectedTag - The currently selected tag (if any)
 * @returns The sort option to use
 */
export function getEffectiveSortOption(
    settings: NotebookNavigatorSettings,
    selectionType: NavigationItemType,
    selectedFolder: TFolder | null,
    selectedTag?: string | null
): SortOption {
    if (selectionType === ItemType.FOLDER && selectedFolder && settings.folderSortOverrides?.[selectedFolder.path]) {
        return settings.folderSortOverrides[selectedFolder.path];
    }
    if (selectionType === ItemType.TAG && selectedTag && settings.tagSortOverrides?.[selectedTag]) {
        return settings.tagSortOverrides[selectedTag];
    }
    return settings.defaultFolderSort;
}

/**
 * Sorts an array of files according to the specified sort option
 * @param files - Array of files to sort (will be mutated)
 * @param sortOption - How to sort the files
 * @param settings - Plugin settings for frontmatter date support
 * @param metadataCache - Metadata cache for reading frontmatter
 */
export function sortFiles(
    files: TFile[], 
    sortOption: SortOption,
    settings: NotebookNavigatorSettings,
    metadataCache: MetadataCache
): void {
    switch (sortOption) {
        case 'modified-desc':
            files.sort((a, b) => {
                const aTime = DateUtils.getFileTimestamp(a, 'modified', settings, metadataCache);
                const bTime = DateUtils.getFileTimestamp(b, 'modified', settings, metadataCache);
                return bTime - aTime;
            });
            break;
        case 'modified-asc':
            files.sort((a, b) => {
                const aTime = DateUtils.getFileTimestamp(a, 'modified', settings, metadataCache);
                const bTime = DateUtils.getFileTimestamp(b, 'modified', settings, metadataCache);
                return aTime - bTime;
            });
            break;
        case 'created-desc':
            files.sort((a, b) => {
                const aTime = DateUtils.getFileTimestamp(a, 'created', settings, metadataCache);
                const bTime = DateUtils.getFileTimestamp(b, 'created', settings, metadataCache);
                return bTime - aTime;
            });
            break;
        case 'created-asc':
            files.sort((a, b) => {
                const aTime = DateUtils.getFileTimestamp(a, 'created', settings, metadataCache);
                const bTime = DateUtils.getFileTimestamp(b, 'created', settings, metadataCache);
                return aTime - bTime;
            });
            break;
        case 'title-asc':
            files.sort((a, b) => a.basename.localeCompare(b.basename));
            break;
        case 'title-desc':
            files.sort((a, b) => b.basename.localeCompare(a.basename));
            break;
    }
}

/**
 * Gets the sort icon name based on sort option
 * @param sortOption - The current sort option
 * @returns Icon name for ObsidianIcon component
 */
export function getSortIcon(sortOption: SortOption): string {
    return sortOption.endsWith('-desc') ? 'sort-desc' : 'sort-asc';
}

/**
 * Checks if date grouping should be shown for a sort option
 * @param sortOption - The current sort option
 * @returns Whether date grouping makes sense for this sort
 */
export function shouldShowDateGrouping(sortOption: SortOption): boolean {
    return !sortOption.startsWith('title');
}

/**
 * Gets the date field to use based on sort option
 * @param sortOption - The current sort option
 * @returns 'ctime' for created sorts, 'mtime' for others
 */
export function getDateField(sortOption: SortOption): 'ctime' | 'mtime' {
    return sortOption.startsWith('created') ? 'ctime' : 'mtime';
}