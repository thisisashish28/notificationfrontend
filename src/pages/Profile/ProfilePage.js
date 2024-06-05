import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import Header from '../../Header/Header';

export default function ProfilePage() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
  
    const { user, updateProfile } = useAuth();
    const submit = user => {
        updateProfile(user);
    };

    const c_dateandtime = new Date(user.created_at);
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    };

    const c_formattedDateTime = c_dateandtime.toLocaleString('en-IN', options);

    const up_dateandtime = new Date(user.updated_at);
    const up_formattedDateTime = up_dateandtime.toLocaleString('en-IN', options);

    return (
        <>
            <Header />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <Title title="Update Profile" />
                    <form onSubmit={handleSubmit(submit)}>
                        <Input 
                            defaultValue={user.name}
                            type="text"
                            label="Name"
                            {...register('name', {
                                required: true,
                                minLength: 5,
                            })}
                            error={errors.name} 
                            className="mb-4"
                        />
                        <div className="mb-4">
                            <span className="font-bold">Profile created at:</span> {c_formattedDateTime}
                        </div>
                        <div className="mb-4">
                            <span className="font-bold">Profile updated at:</span> {up_formattedDateTime}
                        </div>
                        <Button type="submit" text="Update" className="w-full mb-4" />
                    </form>
                    <ChangePassword />
                </div>
            </div>
        </>
    );
}
