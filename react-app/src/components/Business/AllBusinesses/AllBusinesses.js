import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getBusinesses } from '../../../store/businesses';  // Absolute path
import { Link } from 'react-router-dom'
import './AllBusinesses.css'

const AllBusinesses = () => {
    const dispatch = useDispatch()
    const businesses = useSelector(state => state.businesses.allIds.map(id => state.businesses.byId[id]));

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    if (!businesses.length) return null

    return (
        <div className='all-businesses-container'>
            {businesses.map(business => {
                return (
                    <div className='business-tile-container' key={business.id}>
                        <Link to={`/businesses/${business.id}`}>
                            <div>{business.name}</div>
                            <div>{business.address}</div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default AllBusinesses
