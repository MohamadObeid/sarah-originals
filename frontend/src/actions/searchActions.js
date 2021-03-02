import axios from "axios";
import { domain, website } from "../methods/methods";

const search = (controllerID, controls) => async (dispatch, getState) => {
    try {

        controls.website = website
        const search = controls.search
        const action = controls.action

        const { searchResults } = getState()

        var searchResultExist = searchResults.find(searchResult =>
            searchResult.search.collections === search.collections &&
            searchResult.search.keyword === search.keyword &&
            searchResult.search.skip === search.skip &&
            searchResult.search.limit >= search.limit
        )

        if (searchResultExist) {
            if (action)
                dispatch({
                    type: 'UPDATE_ACTIONS', payload: {
                        [action]: {
                            ...searchResultExist,
                            title: controls.title,
                            mounted: [controllerID]
                        }
                    }
                })
            return
        }

        // no data to search for
        if (search.collections.length === 0 && !search.keyword) return

        // get search results
        const { data } = await axios.post(domain + '/api/search/get', controls)
        dispatch({ type: 'SEARCH_SUCCESS', payload: data })

        // set action searchResult
        if (action && data) {
            dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: { ...data, title: controls.title, mounted: [controllerID] }
                }
            })
        }

    } catch (error) {
        dispatch({ type: 'SEARCH_FAIL', payload: error.message })
    }
}

export { search }
