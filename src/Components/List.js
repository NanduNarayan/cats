import { Box, Container, Option, Select, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/image-slider.css'
import { ImageSlider } from './ImageSlider'

function Description({breed}) {

    return(
        <>
        {breed?(
                    <Box>
                    <Typography
                    level="h2"
                    color="neutral"
                    sx={{"padding":"1rem"}}
                    >
                       The {breed.name}
                    </Typography>
                    <Typography
                    level="p"
                    color="black"
                    fontStyle={"italic"}
                    >
                        {breed.description}
                    </Typography>
                </Box>
        ):null}
        </>
    )
}

function List() {
    const breeds = useBreedList();
    const [breedID, setBreedID] = useState("");
    const breed=useBreedData(breedID,breeds);
    useEffect(() =>{
        console.log(breed)
    },[breed])
    return (
        <Container>
            <Box>
                <Typography
                    level='title-md'
                    color='neutral'
                    fontWeight={'bolder'}
                >
                    Choose a breed.
                </Typography>
                <Select
                    color='neutral'
                    variant='outlined'
                    size='lg'
                    onChange={(e, newValue) => {
                        e.preventDefault()
                        setBreedID(current => current === newValue ? current : newValue);
                    }}
                    defaultValue={""}
                    id="breed-select"
                >
                    <Option value="">--Choose Here--</Option>
                    {
                        breeds &&
                        breeds.map((item, index) => (
                            <Option key={index} value={item.id}>{item.name}</Option>
                        ))
                    }
                </Select>
            </Box>
            <ImageSlider id={breedID} />
            <Description breed={breed}/>
        </Container>
    )
}

function useBreedList() {
    const [breeds, setBreeds] = useState(null)
    useEffect(() => {
        axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
            setBreeds(response.data)
        }).catch(err => { console.error(err.message) })

    }, [])
    return breeds
}
 function useBreedData(id,breeds){
    const [breed,setBreed]=useState(null)
    useEffect(()=>{
        if(id!==""){
            const data=breeds.find((item)=>item.id!==id);
            setBreed(()=>data?data:null)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])
    return breed
 }

export default List