import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentCallbackListener() {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUrl = window.location.href;
        
        // Kiểm tra nếu URL chứa 'payment/vn-pay-callback'
        if (currentUrl.includes('payment/vn-pay-callback')) {
            // Chuyển hướng sang /order
            navigate('/order');
        }
    });

    return null; // Không cần render gì, chỉ lắng nghe và chuyển hướng
}

export default PaymentCallbackListener;
