import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';

export function ImageSlider({ id = "" }) {
    const [imageArray, setImageArray] = useState([]);
    const [current, setCurrent] = useState(0);
    const imgRef = useRef(false);
    async function getImages(id, signal) {
        try {
            const result = await axios(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${id}`,
                { signal: signal });
            const imagePromises = result.data.map((item) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = item.url;
                    img.onload = resolve(img.src);
                });
            });
            const imageList = await Promise.all(imagePromises);
            setImageArray(imageList);
        } catch (err) {
            throw new Error(err.message);
        }
    }
    useEffect(() => {
        console.log(id);
        setImageArray([]);
        const controller = new AbortController();
        const signal = controller.signal;
        if (id !== "") {
            getImages(id, signal);
        } else setImageArray(null);

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        let interval = null;
        if (imageArray?.length) {
            interval = setInterval(() => {
                if (!imgRef.current)
                    setCurrent(prev => prev === imageArray.length - 1 ? 0 : (prev + 1));
            }, 3000);

        }
        return () => clearInterval(interval);
    }, [current, imageArray, imgRef]);

    const goBack = (length) => {
        if (length)
            setCurrent(prev => prev === 0 ? length - 1 : prev - 1);
    };
    const goNext = (length) => {
        if (length)
            setCurrent(prev => prev === length - 1 ? 0 : prev + 1);
    };
    return (
        <>
            {imageArray ? (
                <div className="controls">
                    <ArrowBackIosRounded
                        onClick={() => goBack(imageArray.length || null)} />
                    <img className='cat-img' src={imageArray[current]} alt='cat'
                        onPointerEnter={(e) => { imgRef.current = true; }}
                        onPointerLeave={(e) => { imgRef.current = false; }} />
                    <ArrowForwardIosRounded
                        onClick={(e) => goNext(imageArray.length || null)} />
                </div>
            ) : (<p>PLEASE SELECT A BREED FROM THE DROPDOWN</p>)}
        </>
    );
}
