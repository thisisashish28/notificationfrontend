import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function LoginPage() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : window.location.replace('/dashboard')
    }, [user]);

    const submit = async ({ email, password }) => {
        console.log('initial');
        await login(email, password);
        console.log('aaa');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <Title title="Login" />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input 
                        type="email"
                        label="Email"
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[\w-,]+@([\w-]+\.)+[\w-]{2,63}$/i,
                                message: 'Email Is Not Valid',
                            },
                        })}
                        error={errors.email}
                        className="mb-4"
                    />

                    <Input 
                        type="password"
                        label="Password"
                        {...register('password', {
                            required: true,
                        })}
                        error={errors.password}
                        className="mb-4"
                    />

                    <Button type="submit" text="Login" className="w-full mb-4" />

                    <div className="text-center">
                        New user? &nbsp;
                        <Link to={`/${returnUrl ? '?returnUrl=' + returnUrl : ''}`} className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
