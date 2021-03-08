import axios from "axios";
import { domain, website } from "../methods/methods";

const search = (controls) => async (dispatch, getState) => {
    try {

        const action = controls.action
        const search = controls.search
        const slides = controls.slides || []
        const title = controls.title
        const event = controls.event
        const mount = controls.mount || Math.floor(Math.random() * 10000000000000)

        const { searchResults } = getState()

        // find data in store
        var searchResultExist = searchResults.find(searchResult =>

            searchResult.search.type === search.type &&
            searchResult.search.collections.sort().toString() === search.collections.sort().toString() &&
            searchResult.search.keyword.sort().toString() === search.keyword.sort().toString() &&
            searchResult.search.skip === search.skip &&
            searchResult.search.limit === search.limit

        )

        // search result exist in store
        if (searchResultExist)
            return dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: {
                        slides: [...slides, ...searchResultExist.slides],
                        title,
                        mount,
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
                        mount,
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
                        mount,
                        event
                    }
                }
            })


    } catch (error) {
        dispatch({ type: 'SEARCH_FAIL', payload: error.message })
    }
}

export { search }
