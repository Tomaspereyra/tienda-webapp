/**
 * DesignCustomizer - Main T-Shirt Designer Page
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DesignProvider, useDesign } from '../context/DesignContext';
import { TemplateGallery } from '../components/designer/TemplateGallery';
import { CanvasEditor } from '../components/designer/CanvasEditor';
import { TextControls } from '../components/designer/TextControls';
import { TShirtColorSelector } from '../components/designer/TShirtColorSelector';
import { TShirtMockup } from '../components/designer/TShirtMockup';
import { DesignToolbar } from '../components/designer/DesignToolbar';
import { DraftRestoreModal } from '../components/designer/DraftRestoreModal';
import { loadDesignDraft, saveDesignDraft, clearDesignDraft } from '../utils/localStorage';
import styles from './DesignCustomizer.module.css';

const DesignCustomizerContent: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [savedDraft, setSavedDraft] = useState<ReturnType<typeof loadDesignDraft>>(null);
    const [autoSaveMessage, setAutoSaveMessage] = useState<string | null>(null);
    const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
    const { design, restoreDesign } = useDesign();

    // Check for saved draft on mount
    useEffect(() => {
        const draft = loadDesignDraft();
        if (draft && draft.templateId) {
            setSavedDraft(draft);
            setShowModal(true);
        }
    }, []);

    // Auto-save on design changes (debounced)
    useEffect(() => {
        // Don't auto-save if no template is selected
        if (!design.templateId) return;

        // Clear existing timer
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }

        // Set new timer for 2 seconds
        autoSaveTimerRef.current = setTimeout(() => {
            const success = saveDesignDraft(design);
            if (success) {
                setAutoSaveMessage('Auto-guardado ✓');
                setTimeout(() => setAutoSaveMessage(null), 2000);
            }
        }, 2000);

        // Cleanup on unmount
        return () => {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, [design]);

    const handleContinueDraft = () => {
        if (!savedDraft) return;

        // Restore entire design using context
        restoreDesign(savedDraft);

        setShowModal(false);
    };

    const handleStartFresh = () => {
        clearDesignDraft();
        setSavedDraft(null);
        setShowModal(false);
    };

    return (
        <>
            {showModal && savedDraft && (
                <DraftRestoreModal
                    onContinue={handleContinueDraft}
                    onStartFresh={handleStartFresh}
                />
            )}

            <div className={styles.pageContainer}>
                <header className={styles.header}>
                    <Link to="/" className={styles.backLink}>
                        ← Volver al catálogo
                    </Link>
                    <h1 className={styles.title}>Diseñá tu Remera</h1>
                    {autoSaveMessage && (
                        <span className={styles.autoSaveIndicator}>{autoSaveMessage}</span>
                    )}
                </header>

                <div className={styles.designerLayout}>
                    {/* Left Sidebar - Templates and Controls */}
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarSection}>
                            <TemplateGallery />
                        </div>
                        <div className={styles.sidebarSection}>
                            <TShirtColorSelector />
                        </div>
                        <div className={styles.sidebarSection}>
                            <TextControls />
                        </div>
                    </aside>

                    {/* Center - Canvas Editor */}
                    <main className={styles.mainContent}>
                        <CanvasEditor />
                        <DesignToolbar />
                    </main>

                    {/* Right Sidebar - Mockup Preview */}
                    <aside className={styles.previewSidebar}>
                        <TShirtMockup />
                    </aside>
                </div>
            </div>
        </>
    );
};

export const DesignCustomizer: React.FC = () => {
    return (
        <DesignProvider>
            <DesignCustomizerContent />
        </DesignProvider>
    );
};
