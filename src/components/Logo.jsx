import { useNavigate } from "react-router";

export const Logo = () => {
    const navigate = useNavigate();
    return (
        <h1
            className="text-red-600 text-4xl font-extrabold tracking-tight cursor-pointer"
            onClick={() => navigate("/browse")}
        >
            ShowSage
        </h1>
    );
};
