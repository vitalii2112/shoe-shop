import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import {useMemo} from "react";
import {allActions} from "../store/rootActions";

export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
