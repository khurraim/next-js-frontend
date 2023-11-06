import React, { useState, useEffect } from "react";
import Layout from "./layouts/Layout";
import axios from "axios";
import { useRouter } from "next/router";

function Models() {
    const router = useRouter();

    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uniqueAges, setUniqueAges] = useState([]); // State for unique age values
    const [uniqueNationality, setUniqueNationalities] = useState([]);
    const [uniquePrices, setUniquePrices] = useState([]);
    const [uniqueLocations, setUniqueLocations] = useState([]);
    const [uniqueDressSizes, setUniqueDressSizes] = useState([]);

    // Filters (age, nationality, price, location, dressSize)
    const [age, setAge] = useState("all");
    const [nationality, setNationality] = useState("all");
    const [price, setPrice] = useState("all");
    const [location, setLocation] = useState("all");
    const [dressSize, setDressSize] = useState("all");

    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [itemsPerPage] = useState(12); // Items per page

    const handleAgeChange = (event) => {
        const selectedAge = event.target.value;
        setAge(selectedAge);
        router.push(`/models?age=${selectedAge}`);
    };

    const handleNationalityChange = (event) => {
        const selectedNationality = event.target.value;
        setNationality(selectedNationality);
        router.push(`/models?age=${age}&nationality=${selectedNationality}`);
    };

    const handlePriceChange = (event) => {
        const selectedPrice = event.target.value;
        setPrice(selectedPrice);
        router.push (`/models?age=${age}&nationality=${nationality}&price=${selectedPrice}`);
    }

    const handleLocationChange = (event) => {
        const selectedLocation = event.target.value;
        setLocation(selectedLocation);
        router.push (`/models?age=${age}&nationality=${nationality}&price=${price}&location=${selectedLocation}`);
    }

    const handleDressSizeChange = (event) => {
        const selectedDressSize = event.target.value;
        setDressSize(selectedDressSize);
        router.push(`/models?age=${age}&nationality=${nationality}&price=${price}&location=${location}&dressSize=${selectedDressSize}`);
    };

    const resetFilters = () => {
        setAge("all");
        setNationality("all");
        setPrice("all");
        setLocation("all");
        setDressSize("all");
    };

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/models?age=${age}&nationality=${nationality}&price=${price}&location=${location}&dressSize=${dressSize}`)
            .then((response) => {
                setModels(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching models: ", error);
            });
    }, [age, nationality, price, location, dressSize, router]);

        // this hook is rendering ages in the filters column
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/models/unique-ages`)
        .then((response) => {
            setUniqueAges(response.data);
        })
        .catch((error) => { console.log("Error fetching ages :", error) })
    },[]);

    // this hook is rendering nationalities in the filters column
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/models/unique-nationalities`)
        .then((response) => {
            setUniqueNationalities(response.data);
        })
        .catch((error) => { console.log("Error fetching nationalities :", error) })
    },[]);

    // this hook is rendering prices in the filters column
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/models/unique-prices`)
        .then((response)=>{
            setUniquePrices(response.data);
        })
        .catch((error) => { console.log("Error fetching prices :", error) })
    },[])

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/models/unique-locations`)
        .then((response)=>{
            setUniqueLocations(response.data);
        })
        .catch((error) => { console.log("Error fetching locations :", error) })
    },[]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/models/unique-dress-sizes`)
        .then((response)=>{
            setUniqueDressSizes(response.data);
        })
        .catch((error) => { console.log("Error fetching locations :", error) })
    },[]);

    // Calculate the indexes of items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = models.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Layout>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-sm-2 col-md-2 col-lg-2 col-12">
                        <div className="card card-body">
                            <div className="card-title text-center">Filters</div>
                            {/* Age Filter */}
                            <div className="form-group">
                                <label className="form-label">Age Filter:</label>
                                <select className="form-control" value={age} onChange={handleAgeChange}>
                                    <option value="all">All</option>
                                    {/* Add age options */}
                                    {uniqueAges.map((uniqueAge) => (
                                    <option key={uniqueAge} value={uniqueAge}>
                                        {uniqueAge}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            {/* Nationality Filter */}
                            <div className="form-group">
                                <label className="form-label">Nationality Filter:</label>
                                <select className="form-control" value={nationality} onChange={handleNationalityChange}>
                                    <option value="all">All</option>
                                    {/* Add nationality options */}
                                    {uniqueNationality.map((uniqueNationality) => (
                                        <option key={uniqueNationality.nationality} value={uniqueNationality.nationality}>
                                            {uniqueNationality.nationality} ({uniqueNationality.count})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Price Filter */}
                            <div className="form-group">
                                <label className="form-label">Price Filter:</label>
                                <select className="form-control" value={price} onChange={handlePriceChange}>
                                    <option value="all">All</option>
                                    {/* Add price options */}
                                    {uniquePrices.map((uniquePrice) => (
                                        <option key={uniquePrice.price} value={uniquePrice.price}>
                                            {uniquePrice.price} ({uniquePrice.count})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Location Filter */}
                            <div className="form-group">
                                <label className="form-label">Location Filter:</label>
                                <select className="form-control" value={location} onChange={handleLocationChange}>
                                    <option value="all">All</option>    
                                    {uniqueLocations.map((uniqueLocation) => (
                                    <option key={uniqueLocation.location} value={uniqueLocation.location}>
                                        {uniqueLocation.location} ({uniqueLocation.count})
                                    </option>
                                    ))}
                                </select>
                            </div>
                            {/* Dress Size Filter */}
                            <div className="form-group">
                                <label className="form-label">Dress Size Filter:</label>
                                <select className="form-control" value={dressSize} onChange={handleDressSizeChange}>
                                    <option value="all">All</option>
                                    {/* Add dress size options */}
                                    {uniqueDressSizes.map((uniqueDressSize) => (
                                         <option key={uniqueDressSize.dressSize} value={uniqueDressSize.dressSize}>
                                             {uniqueDressSize.dressSize} ({uniqueDressSize.count})
                                         </option>
                                    ))}
                                </select>
                            </div>
                            <button type="button" onClick={resetFilters} className="btn btn-primary my-3">
                                Reset Filters
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-10 col-md-10 col-lg-10 col-12">
                        {loading ? (
                            <p>Loading models...</p>
                        ) : currentItems.length === 0 ? (
                            <p>No models found.</p>
                        ) : (
                            <div className="row">
                                {currentItems.map((model) => (
                                    <div className="col-sm-3 col-md-3 col-lg-3 col-12" key={model.id}>                                
                                        <div className="card  mb-3">
                                            <img
                                            src={`http://127.0.0.1:8000/storage/${model.featuredImage}`}
                                            alt="Featured Image"
                                            style={{'height':'auto', 'width': '100%'}}
                                            />
                                            <div className="card-body">   
                                                {model.title}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Pagination Controls */}
                        <div className="text-center">
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(models.length / itemsPerPage) }).map((_, index) => (
                                    <li
                                        key={index + 1}
                                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Models;
