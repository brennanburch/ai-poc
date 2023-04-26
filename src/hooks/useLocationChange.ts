import { useEffect } from "react";
import { useLocation, type Location } from "react-router-dom";

type Action = (location: Location) => void;

// From https://stackoverflow.com/a/62389224/10292952
function useLocationChange(action: Action) {
	const location = useLocation();
	useEffect(() => {
		action(location);
	}, [location]);
}

export default useLocationChange;
