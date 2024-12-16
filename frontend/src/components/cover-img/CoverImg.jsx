import { useLocation } from 'react-router-dom';
import './cover-img.css';

function CoverImg() {
    const location = useLocation();

    return (
        <>
            {location.pathname === '/' && (
                <div>
                    <img src="/images/cover-img.jpg" alt="cover-img" className="cover-img" />
                </div>
            )}
        </>
    );
}

export default CoverImg;
