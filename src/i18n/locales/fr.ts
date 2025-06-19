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

/**
 * English language strings for Notebook Navigator
 * Organized by feature/component for easy maintenance
 */
export const STRINGS_FR = {
    // Common UI elements
    common: {
        cancel: 'Annuler', // Button text for canceling dialogs and operations (English: Cancel)
        delete: 'Supprimer', // Button text for delete operations in dialogs (English: Delete)
        submit: 'Soumettre', // Button text for submitting forms and dialogs (English: Submit)
        noSelection: 'Aucune sélection', // Placeholder text when no folder or tag is selected (English: No selection)
        untagged: 'Sans étiquette', // Label for notes without any tags (English: Untagged)
        untitled: 'Sans titre', // Default name for notes without a title (English: Untitled)
        featureImageAlt: 'Image vedette', // Alt text for thumbnail/preview images (English: Feature image)
    },

    // File list
    fileList: {
        emptyStateNoSelection: 'Sélectionnez un dossier ou une étiquette pour afficher les notes', // Message shown when no folder or tag is selected (English: Select a folder or tag to view notes)
        emptyStateNoNotes: 'Aucune note', // Message shown when a folder/tag has no notes (English: No notes)
        pinnedSection: '📌 Épinglées', // Header for the pinned notes section at the top of file list (English: 📌 Pinned)
    },

    // Folder tree
    folderTree: {
        rootFolderName: 'Coffre', // Display name for the vault root folder in the tree (English: Vault)
    },

    // Tag list
    tagList: {
        sectionHeader: 'Étiquettes', // Header text for the tags section below folders (English: Tags)
        untaggedLabel: 'Sans étiquette', // Label for the special item showing notes without tags (English: Untagged)
    },

    // Pane header
    paneHeader: {
        collapseAllFolders: 'Replier tous les dossiers', // Tooltip for button that collapses all expanded folders (English: Collapse all folders)
        expandAllFolders: 'Déplier tous les dossiers', // Tooltip for button that expands all folders (English: Expand all folders)
        newFolder: 'Nouveau dossier', // Tooltip for create new folder button (English: New folder)
        newNote: 'Nouvelle note', // Tooltip for create new note button (English: New note)
        mobileBackToFolders: 'Retour aux dossiers', // Mobile-only back button text to return to folder list (English: Back to folders)
        changeSortOrder: 'Changer l\'ordre de tri', // Tooltip for the sort order toggle button (English: Change sort order)
        defaultSort: 'Par défaut', // Label for default sorting mode (English: Default)
        customSort: 'Personnalisé', // Label for custom sorting mode (English: Custom)
    },

    // Context menus
    contextMenu: {
        file: {
            openInNewTab: 'Ouvrir dans un nouvel onglet',
            openToRight: 'Ouvrir à droite',
            openInNewWindow: 'Ouvrir dans une nouvelle fenêtre',
            pinNote: 'Épingler la note',
            unpinNote: 'Désépingler la note',
            duplicateNote: 'Dupliquer la note',
            openVersionHistory: 'Ouvrir l\'historique des versions',
            revealInFinder: 'Afficher dans le Finder',
            showInExplorer: 'Afficher dans l\'explorateur système',
            copyDeepLink: 'Copier le lien profond',
            renameNote: 'Renommer la note',
            deleteNote: 'Supprimer la note',
        },
        folder: {
            newNote: 'Nouvelle note',
            newFolder: 'Nouveau dossier',
            newCanvas: 'Nouveau canevas',
            newBase: 'Nouvelle base de données',
            duplicateFolder: 'Dupliquer le dossier',
            searchInFolder: 'Rechercher dans le dossier',
            createFolderNote: 'Créer une note de dossier',
            deleteFolderNote: 'Supprimer la note de dossier',
            changeIcon: 'Changer l\'icône',
            removeIcon: 'Supprimer l\'icône',
            changeColor: 'Changer la couleur',
            removeColor: 'Supprimer la couleur',
            renameFolder: 'Renommer le dossier',
            deleteFolder: 'Supprimer le dossier',
        },
    },

    // Modal dialogs
    modals: {
        iconPicker: {
            searchPlaceholder: 'Rechercher des icônes...',
            recentlyUsedHeader: 'Récemment utilisées',
            emptyStateSearch: 'Commencez à taper pour rechercher des icônes',
            emptyStateNoResults: 'Aucune icône trouvée',
            showingResultsInfo: 'Affichage de 50 résultats sur {count}. Tapez plus pour affiner.',
        },
        colorPicker: {
            header: 'Choisir la couleur du dossier',
            colors: {
                red: 'Rouge',
                orange: 'Orange',
                amber: 'Ambre',
                yellow: 'Jaune',
                lime: 'Citron vert',
                green: 'Vert',
                emerald: 'Émeraude',
                teal: 'Sarcelle',
                cyan: 'Cyan',
                sky: 'Ciel',
                blue: 'Bleu',
                indigo: 'Indigo',
                violet: 'Violet',
                purple: 'Pourpre',
                fuchsia: 'Fuchsia',
                pink: 'Rose',
                rose: 'Rose pâle',
                gray: 'Gris',
                slate: 'Ardoise',
                stone: 'Pierre',
            },
        },
        fileSystem: {
            newFolderTitle: 'Nouveau dossier',
            renameFolderTitle: 'Renommer le dossier',
            renameFileTitle: 'Renommer le fichier',
            deleteFolderTitle: 'Supprimer \'{name}\' ?',
            deleteFileTitle: 'Supprimer \'{name}\' ?',
            folderNamePrompt: 'Entrez le nom du dossier :',
            renamePrompt: 'Entrez le nouveau nom :',
            deleteFolderConfirm: 'Êtes-vous sûr de vouloir supprimer ce dossier et tout son contenu ?',
            deleteFileConfirm: 'Êtes-vous sûr de vouloir supprimer ce fichier ?',
        },
    },

    // File system operations
    fileSystem: {
        errors: {
            createFolder: 'Échec de la création du dossier : {error}',
            createFile: 'Échec de la création du fichier : {error}',
            renameFolder: 'Échec du renommage du dossier : {error}',
            renameFile: 'Échec du renommage du fichier : {error}',
            deleteFolder: 'Échec de la suppression du dossier : {error}',
            deleteFile: 'Échec de la suppression du fichier : {error}',
            duplicateNote: 'Échec de la duplication de la note : {error}',
            createCanvas: 'Échec de la création du canevas : {error}',
            createDatabase: 'Échec de la création de la base de données : {error}',
            duplicateFolder: 'Échec de la duplication du dossier : {error}',
            openVersionHistory: 'Échec de l\'ouverture de l\'historique des versions : {error}',
            versionHistoryNotFound: 'Commande d\'historique des versions introuvable. Assurez-vous qu\'Obsidian Sync est activé.',
            revealInExplorer: 'Échec de l\'affichage du fichier dans l\'explorateur système : {error}',
        },
        defaultNames: {
            untitled: 'Sans titre',
            untitledNumber: 'Sans titre {number}',
        },
    },

    // Drag and drop operations
    dragDrop: {
        errors: {
            cannotMoveIntoSelf: 'Impossible de déplacer un dossier dans lui-même ou un sous-dossier.',
            itemAlreadyExists: 'Un élément nommé "{name}" existe déjà à cet emplacement.',
            failedToMove: 'Échec du déplacement : {error}',
        },
    },

    // Date grouping
    dateGroups: {
        today: 'Aujourd\'hui',
        yesterday: 'Hier',
        previous7Days: '7 derniers jours',
        previous30Days: '30 derniers jours',
    },

    // Weekdays
    weekdays: {
        sunday: 'Dimanche',
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi',
    },

    // Plugin commands
    commands: {
        open: 'Ouvrir', // Command palette: Opens the Notebook Navigator view (English: Open)
        revealActiveFile: 'Révéler le fichier actif', // Command palette: Reveals and selects the currently active file in the navigator (English: Reveal active file)
        focusFileList: 'Focus sur la liste de fichiers', // Command palette: Moves keyboard focus to the file list pane (English: Focus file list)
    },

    // Plugin UI
    plugin: {
        viewName: 'Navigateur de Carnets', // Name shown in the view header/tab (English: Notebook Navigator)
        ribbonTooltip: 'Navigateur de Carnets', // Tooltip for the ribbon icon in the left sidebar (English: Notebook Navigator)
        revealInNavigator: 'Révéler dans le Navigateur de Carnets', // Context menu item to reveal a file in the navigator (English: Reveal in Notebook Navigator)
    },

    // Settings
    settings: {
        sections: {
            noteDisplay: 'Affichage des notes',
            folderDisplay: 'Affichage des dossiers',
            tagDisplay: 'Affichage des étiquettes',
            folderNotes: 'Notes de dossier',
            advanced: 'Avancé',
        },
        items: {
            sortNotesBy: {
                name: 'Trier les notes par',
                desc: 'Choisissez comment les notes sont triées dans la liste des notes.',
                options: {
                    'modified-desc': 'Date de modification (plus récente en premier)',
                    'modified-asc': 'Date de modification (plus ancienne en premier)',
                    'created-desc': 'Date de création (plus récente en premier)',
                    'created-asc': 'Date de création (plus ancienne en premier)',
                    'title-asc': 'Titre (A en premier)',
                    'title-desc': 'Titre (Z en premier)',
                },
            },
            groupByDate: {
                name: 'Grouper les notes par date',
                desc: 'Lorsque triées par date, grouper les notes sous des en-têtes de date.',
            },
            showNotesFromSubfolders: {
                name: 'Afficher les notes des sous-dossiers',
                desc: 'Afficher toutes les notes des sous-dossiers dans la vue du dossier actuel.',
            },
            showSubfolderNamesInList: {
                name: 'Afficher les noms des dossiers parents',
                desc: 'Afficher le nom du dossier parent pour les notes provenant des sous-dossiers.',
            },
            autoRevealActiveNote: {
                name: 'Révéler automatiquement la note active',
                desc: 'Révéler et sélectionner automatiquement les notes lorsqu\'elles sont ouvertes depuis le Commutateur rapide, les liens ou la recherche.',
            },
            autoSelectFirstFile: {
                name: 'Sélectionner automatiquement le premier fichier lors du changement de dossier',
                desc: 'Sélectionner et ouvrir automatiquement le premier fichier lors du changement de dossier.',
            },
            excludedNotes: {
                name: 'Notes exclues',
                desc: 'Liste de propriétés de métadonnées séparées par des virgules. Les notes contenant l\'une de ces propriétés seront masquées (ex. : draft, private, archived).',
                placeholder: 'draft, private',
            },
            excludedFolders: {
                name: 'Dossiers exclus',
                desc: 'Liste de dossiers à masquer séparés par des virgules. Supporte les caractères génériques : assets* (commence par), *_temp (finit par).',
                placeholder: 'templates, assets*, *_temp',
            },
            showDate: {
                name: 'Afficher la date',
                desc: 'Afficher la date sous les noms des notes.',
            },
            dateFormat: {
                name: 'Format de date',
                desc: 'Format pour afficher les dates (utilise le format date-fns).',
                placeholder: 'd MMMM yyyy',
                help: 'Formats courants :\nd MMMM yyyy = 25 mai 2022\ndd/MM/yyyy = 25/05/2022\nyyyy-MM-dd = 2022-05-25\n\nJetons :\nyyyy/yy = année\nMMMM/MMM/MM = mois\ndd/d = jour\nEEEE/EEE = jour de la semaine',
                helpTooltip: 'Cliquez pour la référence du format',
            },
            timeFormat: {
                name: 'Format d\'heure',
                desc: 'Format pour afficher les heures dans les groupes Aujourd\'hui et Hier (utilise le format date-fns).',
                placeholder: 'HH:mm',
                help: 'Formats courants :\nHH:mm = 14:30 (24 heures)\nh:mm a = 2:30 PM (12 heures)\nHH:mm:ss = 14:30:45\nh:mm:ss a = 2:30:45 PM\n\nJetons :\nHH/H = 24 heures\nhh/h = 12 heures\nmm = minutes\nss = secondes\na = AM/PM',
                helpTooltip: 'Cliquez pour la référence du format',
            },
            showFilePreview: {
                name: 'Afficher l\'aperçu de la note',
                desc: 'Afficher le texte d\'aperçu sous les noms des notes.',
            },
            skipHeadingsInPreview: {
                name: 'Ignorer les en-têtes dans l\'aperçu',
                desc: 'Ignorer les lignes d\'en-tête lors de la génération du texte d\'aperçu.',
            },
            skipNonTextInPreview: {
                name: 'Ignorer le non-texte dans l\'aperçu',
                desc: 'Ignorer les images, les intégrations et autres éléments non textuels du texte d\'aperçu.',
            },
            previewRows: {
                name: 'Lignes d\'aperçu',
                desc: 'Nombre de lignes à afficher pour le texte d\'aperçu.',
                options: {
                    '1': '1 ligne',
                    '2': '2 lignes',
                    '3': '3 lignes',
                    '4': '4 lignes',
                    '5': '5 lignes',
                },
            },
            fileNameRows: {
                name: 'Lignes de titre',
                desc: 'Nombre de lignes à afficher pour les titres des notes.',
                options: {
                    '1': '1 ligne',
                    '2': '2 lignes',
                },
            },
            showFeatureImage: {
                name: 'Afficher l\'image vedette',
                desc: 'Afficher les images miniatures depuis les métadonnées. Conseil : Utilisez le plugin "Featured Image" pour définir automatiquement des images vedettes pour tous vos documents.',
            },
            featureImageProperty: {
                name: 'Propriété d\'image vedette',
                desc: 'Le nom de la propriété des métadonnées pour les images miniatures. Important ! Dans le plugin Featured Image, vous pouvez choisir de créer des miniatures redimensionnées, cela améliorera considérablement les performances ! Utilisez 42 pixels pour des performances maximales, ou 84 pixels pour les écrans Retina. La propriété redimensionnée s\'appelle "featureResized" par défaut.',
                placeholder: 'feature',
            },
            showRootFolder: {
                name: 'Afficher le dossier racine',
                desc: 'Afficher "Coffre" comme dossier racine dans l\'arborescence.',
            },
            showFolderFileCount: {
                name: 'Afficher le nombre de notes des dossiers',
                desc: 'Afficher le nombre de notes dans chaque dossier.',
            },
            showFolderIcons: {
                name: 'Afficher les icônes de dossiers',
                desc: 'Afficher les icônes à côté des noms de dossiers dans l\'arborescence.',
            },
            showTags: {
                name: 'Afficher les étiquettes',
                desc: 'Afficher la section des étiquettes sous les dossiers dans le navigateur.',
            },
            showUntagged: {
                name: 'Afficher les notes sans étiquette',
                desc: 'Afficher l\'élément "Sans étiquette" pour les notes sans aucune étiquette.',
            },
            enableFolderNotes: {
                name: 'Activer les notes de dossier',
                desc: 'Cliquer sur les dossiers pour ouvrir leurs notes au lieu d\'afficher la liste des fichiers.',
            },
            folderNoteName: {
                name: 'Nom de la note de dossier',
                desc: 'Nom du fichier de note de dossier. Laisser vide pour utiliser le même nom que le dossier.',
                placeholder: 'Laisser vide pour le nom du dossier',
            },
            hideFolderNoteInList: {
                name: 'Masquer les notes de dossier dans la liste des fichiers',
                desc: 'Masquer la note de dossier pour qu\'elle n\'apparaisse pas dans la liste des fichiers du dossier.',
            },
            confirmBeforeDelete: {
                name: 'Confirmer avant de supprimer les notes',
                desc: 'Afficher une boîte de dialogue de confirmation lors de la suppression de notes ou de dossiers',
            },
            useFrontmatterDates: {
                name: 'Lire les métadonnées du frontmatter',
                desc: 'Lire les noms de notes et horodatages du frontmatter lorsqu\'ils sont disponibles, sinon utiliser les valeurs du système',
            },
            frontmatterNameField: {
                name: 'Champ de nom',
                desc: 'Champ frontmatter à utiliser comme nom d\'affichage de la note. Laisser vide pour utiliser le nom du fichier.',
                placeholder: 'title',
            },
            frontmatterCreatedField: {
                name: 'Champ d\'horodatage de création',
                desc: 'Nom du champ frontmatter pour l\'horodatage de création. Laisser vide pour utiliser uniquement la date du système.',
                placeholder: 'created',
            },
            frontmatterModifiedField: {
                name: 'Champ d\'horodatage de modification',
                desc: 'Nom du champ frontmatter pour l\'horodatage de modification. Laisser vide pour utiliser uniquement la date du système.',
                placeholder: 'modified',
            },
            frontmatterDateFormat: {
                name: 'Format d\'horodatage',
                desc: 'Format utilisé pour analyser les horodatages dans le frontmatter',
                placeholder: "yyyy-MM-dd'T'HH:mm:ss",
                helpTooltip: 'Voir la documentation du format date-fns',
                help: 'Formats courants :\nyyyy-MM-dd\'T\'HH:mm:ss → 2025-01-04T14:30:45\ndd/MM/yyyy HH:mm:ss → 04/01/2025 14:30:45\nMM/dd/yyyy h:mm:ss a → 01/04/2025 2:30:45 PM',
            },
            supportDevelopment: {
                name: 'Soutenir le développement',
                desc: 'Si vous aimez utiliser le Navigateur de Carnets, veuillez envisager de soutenir son développement continu.',
                buttonText: '❤️ Sponsoriser sur GitHub',
            },
        },
    },
};