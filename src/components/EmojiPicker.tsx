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

import React, { useState, useEffect, useRef } from 'react';
import { isEmoji } from '../utils/iconUtils';

interface EmojiPickerProps {
	onSelectEmoji: (emoji: string) => void;
	recentlyUsedEmojis: string[];
}

/**
 * Simple emoji picker that allows any emoji input
 */
export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelectEmoji, recentlyUsedEmojis }) => {
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	// Focus input on mount
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Get the first character/emoji from the input
		const firstChar = value.slice(0, [...value].length > 0 ? [...value][0].length : 0);
		setInputValue(firstChar);
	};

	const handleSubmit = () => {
		if (inputValue && isEmoji(inputValue)) {
			onSelectEmoji(inputValue);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	};

	const handleRecentEmojiClick = (emoji: string) => {
		onSelectEmoji(emoji);
	};

	return (
		<div className="nn-emoji-picker-simple">
			<div className="nn-emoji-input-section">
				<h3 className="nn-emoji-input-title">Enter any emoji</h3>
				<div className="nn-emoji-input-container">
					<input
						ref={inputRef}
						type="text"
						placeholder="Type or paste emoji..."
						className="nn-emoji-input-field"
						value={inputValue}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
					/>
					<button 
						className="nn-emoji-submit-button"
						onClick={handleSubmit}
						disabled={!inputValue || !isEmoji(inputValue)}
					>
						Use emoji
					</button>
				</div>
				{inputValue && !isEmoji(inputValue) && (
					<div className="nn-emoji-error">Please enter a valid emoji</div>
				)}
			</div>

			{recentlyUsedEmojis.length > 0 && (
				<>
					<div className="nn-emoji-divider"></div>
					<div className="nn-emoji-recent-section">
						<h3 className="nn-emoji-recent-title">Recently used</h3>
						<div className="nn-emoji-recent-grid">
							{recentlyUsedEmojis.map((emoji, index) => (
								<button
									key={`${emoji}-${index}`}
									className="nn-emoji-recent-item"
									onClick={() => handleRecentEmojiClick(emoji)}
									title={emoji}
								>
									{emoji}
								</button>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};