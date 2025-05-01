import { ClipLoader } from "react-spinners"

export default function LoadingOverlay({ isLoading }) {
    return (
        <div className={`loading-overlay ${isLoading ? 'show' : ''}`}>
            <ClipLoader color="#36d7b7" size={50} />
        </div>
    )
}