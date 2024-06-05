import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
    const auth = useAuth();
    const { user } = auth;
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : window.location.replace('/dashboard');
    }, [user]);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        await auth.register(data);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <Title title="Register" />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input 
                        type="text"
                        label="Name"
                        {...register('name', {
                            required: true,
                            minLength: 1,
                        })}
                        error={errors.name}
                        className="mb-4"
                    />

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
                            minLength: 5,
                        })}
                        error={errors.password}
                        className="mb-4"
                    />
                    
                    <Input
                        type="password"
                        label="Confirm Password"
                        {...register('c_password', {
                            required: true,
                            validate: value =>
                                value !== getValues('password')
                                    ? 'Passwords Do Not Match'
                                    : true,
                        })}
                        error={errors.c_password}
                        className="mb-4"
                    />

                    <Button type="submit" text="Register" className="w-full mb-4" />

                    <div className="text-center">
                        Already a User? &nbsp;
                        <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`} className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
