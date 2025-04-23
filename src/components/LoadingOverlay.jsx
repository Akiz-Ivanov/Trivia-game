import { ClipLoader } from "react-spinners"

export default function LoadingOverlay() {
    return (
        <div className="loading-overlay">
            <p>Loading...</p>
            <ClipLoader color="#36d7b7" size={50} />
        </div>
    )
}