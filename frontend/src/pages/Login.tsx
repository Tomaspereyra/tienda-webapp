import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@context/AuthContext';
import { authService } from '@services/auth';
import { loginValidation } from '@utils/validation';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { showToast } from '@components/common/Toast';
import styles from './Login.module.css';

interface LoginFormData {
    email: string;
    password: string;
}

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            setLoginError(null);

            // Call mock auth service
            const response = await authService.login({
                email: data.email,
                password: data.password,
            });

            // Update auth context
            login(response.token, response.user);

            // Show success message
            showToast('Login exitoso. Bienvenido!', 'success');

            // Redirect to admin dashboard
            navigate('/admin');
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Error al iniciar sesión';
            setLoginError(errorMessage);
            showToast(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                {/* Logo/Icon */}
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>🔐</div>
                    <h1 className={styles.title}>Panel de Administración</h1>
                    <p className={styles.subtitle}>
                        Ingresá tus credenciales para acceder
                    </p>
                </div>

                {/* Error Message */}
                {loginError && (
                    <div className={styles.errorMessage}>
                        {loginError}
                    </div>
                )}

                {/* Login Form */}
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="admin@tienda.com"
                        error={errors.email?.message}
                        {...register('email', loginValidation.email)}
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="Ingresá tu contraseña"
                        error={errors.password?.message}
                        {...register('password', loginValidation.password)}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                </form>

                {/* Credentials Hint (Mock) */}
                <div className={styles.credentialsHint}>
                    <strong>💡 Credenciales de prueba:</strong>
                    Email: admin@tienda.com
                    <br />
                    Password: admin123
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        <a href="/" className={styles.homeLink}>
                            ← Volver al catálogo
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
