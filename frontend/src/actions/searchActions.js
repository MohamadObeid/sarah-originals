import axios from "axios";
import { domain, website } from "../methods/methods";

const search = (controls) => async (dispatch, getState) => {
    try {

        const action = controls.action
        const search = controls.search
        const slides = controls.slides || []
        const title = controls.title
        const mounted = controls.mounted
        const event = controls.event

        const { searchResults } = getState()

        // find data in store
        var searchResultExist = searchResults.find(searchResult =>

            searchResult.search.type === search.type &&
            searchResult.search.collections.sort().toString() == search.collections.sort().toString() &&
            searchResult.search.keyword.sort().toString() == search.keyword.sort().toString() &&
            searchResult.search.skip === search.skip &&
            searchResult.search.limit >= search.limit

        )

        // search result exist in store
        if (searchResultExist)
            if (action)
                return dispatch({
                    type: 'UPDATE_ACTIONS', payload: {
                        [action]: {
                            slides: [...slides, ...searchResultExist.slides],
                            title,
                            mounted,
                            event
                        }
                    }
                })

        // no data to search for
        if (search.collections.length === 0 && search.keyword.length === 0)
            return dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: {
                        slides,
                        title,
                        mounted,
                        event
                    }
                }
            })

        // get search results
        const { data } = await axios.post(domain + '/api/search/get', { search, website })
        dispatch({ type: 'SEARCH_SUCCESS', payload: { slides: data, search } })

        // set action searchResult
        if (data)
            return dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: {
                        slides: [...slides, ...data],
                        title,
                        mounted,
                        event
                    }
                }
            })


    } catch (error) {
        dispatch({ type: 'SEARCH_FAIL', payload: error.message })
    }
}

export { search }
