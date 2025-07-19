/**
 * Utility functions for handling folder icons including emoji detection
 */

/**
 * Checks if a given string contains emoji characters
 * @param icon The icon string to check
 * @returns true if the string contains emoji, false otherwise
 */
export function isEmoji(icon: string): boolean {
	if (!icon || typeof icon !== 'string') {
		return false;
	}

	// Comprehensive emoji detection using Unicode ranges
	// Covers most common emoji categories
	const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]|[\u{238C}-\u{2454}]|[\u{20D0}-\u{20FF}]/u;
	
	return emojiRegex.test(icon);
}

