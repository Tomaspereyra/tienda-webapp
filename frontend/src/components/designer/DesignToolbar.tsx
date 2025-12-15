/**
 * DesignToolbar - Action toolbar with export and WhatsApp functionality
 */

import React, { useState } from 'react';
import { useDesign } from '../../context/DesignContext';
import { CONTACT_INFO } from '../../config/contact';
import { saveDesignDraft, clearDesignDraft } from '../../utils/localStorage';
import styles from './DesignToolbar.module.css';

export const DesignToolbar: React.FC = () => {
    const { design } = useDesign();
    const [isExporting, setIsExporting] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    const handleSendWhatsApp = () => {
        // Validation with improved error messages
        if (!design.templateId) {
            alert('⚠️ Primero seleccioná una plantilla\n\nPor favor, elegí una plantilla de la galería para comenzar tu diseño.');
            return;
        }

        if (design.textElements.length === 0) {
            alert('⚠️ Agregá texto a tu diseño\n\nUsá el botón "+ Agregar Texto" en el panel lateral para personalizar tu remera.');
            return;
        }

        setIsExporting(true);

        // Generate message with design details
        const textList = design.textElements
            .map((el, i) => `  ${i + 1}. "${el.content}"`)
            .join('\n');

        const message = `Hola! Quiero ordenar una remera personalizada:

📋 *Diseño personalizado*
Plantilla: ${design.templateName || 'Diseño personalizado'}
Color de remera: ${design.shirtColor.name}
${design.textElements.length > 0 ? `\nTextos agregados:\n${textList}` : ''}

¿Podrían confirmarme precio y tiempos de entrega?

Gracias!`;

        // Generate WhatsApp URL
        const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        // Clear draft after successful WhatsApp export
        clearDesignDraft();

        setTimeout(() => setIsExporting(false), 1000);
    };

    const handleSaveDraft = () => {
        const success = saveDesignDraft(design);
        if (success) {
            setSaveMessage('Borrador guardado ✓');
            setTimeout(() => setSaveMessage(null), 3000);
        }
    };

    return (
        <div className={styles.toolbarContainer}>
            <button
                onClick={handleSendWhatsApp}
                disabled={!design.templateId || isExporting}
                className={styles.whatsappButton}
                aria-label="Enviar diseño por WhatsApp"
            >
                {isExporting ? (
                    <>⏳ Enviando...</>
                ) : (
                    <>
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Consultar por WhatsApp
                    </>
                )}
            </button>

            <button
                onClick={handleSaveDraft}
                disabled={!design.templateId}
                className={styles.saveDraftButton}
                aria-label="Guardar borrador"
            >
                💾 Guardar Borrador
            </button>

            {saveMessage && (
                <p className={styles.saveMessage}>{saveMessage}</p>
            )}

            {
                !design.templateId && (
                    <p className={styles.hint}>Seleccioná una plantilla para continuar</p>
                )
            }
        </div >
    );
};
