import react, { useState, useEffect } from 'react'
import { Nav, NavLink, Navbar, NavbarBrand, Form, FormControl, Button } from 'react-bootstrap';
import './Navbar.css'
import Axios from 'axios'
import logo from './Y_Combinator_logo.png'
import Content from './Content'

function Searchbar() {
    const [input, setInput] = useState('')
    const [data, setData] = useState([])
    const [search, setSearch] = useState('?tags=front_page')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [search])

    const fetchData = async () => {
        setLoading(true)
        await Axios.get(`https://hn.algolia.com/api/v1/search${search}`)
            .then(response => setData(response.data.hits))
            .catch(error => console.log(error))
        console.log(data)
        setLoading(false)
    }

    const changeInput = (e) => {
        e.preventDefault()
        setSearch(`?query=${input}&tags=story`)
    }



    return (
        <>
            <Navbar bg="dark" variant="dark" className="navbar">
                <img src={logo} onClick={() => setSearch('?tags=front_page')} />
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => setSearch('?tags=front_page')}>Home</Nav.Link>
                    <Nav.Link onClick={() => setSearch('_by_date?tags=(story,poll)')}>Newest</Nav.Link>
                    <Nav.Link onClick={() => setSearch('?query=&tags=story')}>Best of All </Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search..." className="mr-sm-2" onChange={(e) => setInput(e.target.value)} />
                    <Button variant="outline-info" onClick={changeInput}>Search</Button>
                </Form>
            </Navbar>
            <Content data={data} loading={loading} />
        </>
    );
}

export default Searchbar;
