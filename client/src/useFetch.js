import {useState, useEffect} from 'react'

// usefetch is a custom hook for GET requests that can be used in many places
function useFetch(url) {
    const [data, setData] = useState(null) 
    // if fetch takes long, you see Loading... on screen untill data show
    const [loading, setLoading] = useState(true)
    // to show error on screen
    const [error, setError] = useState(null)

    useEffect(() => {
        // switching routes while the fetch of data still is in progress 
        // causes an error on older react v.
        // const abortController = new AbortController()

        // fetch(url, {signal: abortController.signal})
        fetch(url)
        // here parse json to javascript
        .then(res => {
            // console.log(res)
            if(!res.ok) {
                throw Error('could not fetch data for that resource')
            }
            return res.json()
        }) 
        // here pass this javascript array to show on screen
        .then(res => {
            // console.log(res)
            setData(res)
            setLoading(false)
            setError(null)
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
            setError(err.message)
            // // 2. and the error name is below
            // if (err.name ==='AbortError') {
            //     // 3. then we don't update state and log this
            //     console.log('fetch aborted')
            // } else {
            //     setLoading(false)
            //     setError(err.message)
            // }
        })
        // return () => console.log('cleanup')
        // 1. if you abort fetch
        // return () => abortController.abort()
    }, [url])

    return {data, loading, error}
}
export default useFetch