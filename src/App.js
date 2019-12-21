import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import Header from "./Components/Header";
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';

function App () {
    const [data, setData] = useState('');

    useEffect(() => {
        $.ajax({
            url:'/resumeData.json',
            dataType:'json',
            success: function(dataJSON){
                setData(dataJSON);
            },
            error: function(xhr, status, err){
                console.log(err);
                alert(err);
            }
        });
    }, []);

    return (
        <div className="App">
            { data !== '' && <Header data={data.main}/> }
            { data !== '' && <About data={data.main}/> }
            { data !== '' && <Resume data={data.resume}/> }
            { data !== '' && <Portfolio data={data.portfolio}/> }
            { data !== '' && <Testimonials data={data.testimonials}/> }
            { data !== '' && <Footer data={data.main}/> }
        </div>
    );
}

export default App;
