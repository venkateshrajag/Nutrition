import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 mx-auto mb-4" style={{ border: '4px solid #FFE5CC', borderTopColor: '#FF9933' }}></div>
                    <p className="text-xl" style={{ color: '#E67E22' }}>Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
