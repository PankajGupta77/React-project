import React, { useState } from 'react';
import "./mainbody.css";
const PropsDataSend = () => {
    // let x=[
    //     {
    //         name:"pankaj"
    //     },
    //     {
    //         name:"rohan"
    //     },
    //     {
    //         name:"sohan"
    //     }
    // ]
    // let count =0;
    //  function pankaj(val){
    //    if(count<3){
    //       count++;
    //       console.log(val)
    //    }
    //  }
    // function usestatemethod(){
    //     setname("pankaj")
    // }
    // let [name,setname] = useState("Raju")

    // let count=0;
//     let [value,setvalue] = useState(0)
//    function decriment(){
//     setvalue(value-1)
//    }
//    function reset(){
//     setvalue(0)
//    }
//    function incriment(){
//     setvalue(value+1)
//    }
let [name,setname] = useState()
function handlevent(event){
    setname(event.target.value);
}
    return (
        // <div>
        //     {x.map((val) => (
        //         <h1>{val.name}</h1>
        //     ))}
        // </div>
        <>
        {/* <div>
            Learn click event
            <button onClick={()=>pankaj("pankaj")}>Click me🥺</button>
        </div> */}


        {/* <div>
            <p>react hook:{name}</p>
            <button onClick={usestatemethod}>Click me🥺</button>

        </div> */}


        {/* <div>
            <h1>{value}</h1>
            <button onClick={decriment}>decriment</button>
            <button onClick={reset}>reset</button>
            <button onClick={incriment}>incriment</button>
        </div> */}
        {/* <input value={name} onChange={handlevent} />
        <p>name:{name}</p> */}
          <div className="container">
    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-6">
			<div className="course-card">
				<div  className="course-card-img">
					<img src="https://cdn.freebiesupply.com/logos/large/2x/sketch-2-logo-png-transparent.png" className="main" alt="" />
					<img src="https://cdn.freebiesupply.com/logos/large/2x/sketch-2-logo-png-transparent.png" className="layered" alt="" />

				</div>
				<div className="course-card-content">
					<h4>Sketch App MasterclassName</h4>
					<h6>$ 19.99</h6>
				</div>
			</div>
		</div>
      </div>
      </div>
        </>
    );
}



export default PropsDataSend;
