import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../config/contact';
import { InstagramIcon } from '@components/icons/InstagramIcon';
import { WhatsAppIcon } from '@components/icons/WhatsAppIcon';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
        alert('¡Gracias por suscribirte!');
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerGrid}>
                    {/* Column 1: Shop */}
                    <div className={styles.footerColumn}>
                        <h4>Tienda</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link to="/">Todos los productos</Link></li>
                            <li><Link to="/?gender=Hombre">Hombre</Link></li>
                            <li><Link to="/?gender=Mujer">Mujer</Link></li>
                            <li><Link to="/?gender=Niño">Niño/a</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Info - Hidden for now */}
                    {/* <div className={styles.footerColumn}>
                        <h4>Información</h4>
                        <ul className={styles.footerLinks}>
                            <li><a href="#about">Acerca de</a></li>
                            <li><a href="#shipping">Envíos</a></li>
                            <li><a href="#returns">Devoluciones</a></li>
                            <li><a href="#contact">Contacto</a></li>
                        </ul>
                    </div> */}

                    {/* Column 3: Newsletter */}
                    <div className={styles.footerColumn}>
                        <h4>Newsletter</h4>
                        <div className={styles.newsletter}>
                            <p>Recibí noticias y ofertas exclusivas</p>
                            <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                                <input
                                    type="email"
                                    placeholder="Tu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.newsletterInput}
                                    required
                                />
                                <button type="submit" className={styles.newsletterButton}>
                                    Suscribir
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Column 4: Social Media */}
                    <div className={styles.footerColumn}>
                        <h4>Seguinos</h4>
                        <div className={styles.socialLinks}>
                            <a
                                href={CONTACT_INFO.instagram.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Seguinos en Instagram"
                            >
                                <InstagramIcon size={20} />
                                <span>Instagram</span>
                            </a>
                            <a
                                href={`https://wa.me/${CONTACT_INFO.whatsapp.phoneNumber}?text=${encodeURIComponent('¡Hola! Me gustaría hacer una consulta.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Contactanos por WhatsApp"
                            >
                                <WhatsAppIcon size={20} />
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © 2024 Tienda Inmaculada. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};
