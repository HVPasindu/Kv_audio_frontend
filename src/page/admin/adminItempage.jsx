const sampleArr = [
  {
    key: "AUDIO001",
    name: "Bluetooth Speaker",
    price: 2999,
    description: "Portable wireless speaker with powerful sound.",
    category: "audio",
    availability: true,
    dimentions: "15x10x10 cm"
  },
  {
    key: "LIGHTS001",
    name: "LED Party Light",
    price: 1499,
    description: "Colorful rotating disco light for parties.",
    category: "lights",
    availability: true,
    dimentions: "12x12x15 cm"
  },
  {
    key: "AUDIO002",
    name: "Wireless Earbuds",
    price: 5999,
    description: "High-quality noise-cancelling earbuds.",
    category: "audio",
    availability: true,
    dimentions: "3x2x2 cm"
  },
  {
    key: "LIGHTS002",
    name: "Smart Ceiling Light",
    price: 9999,
    description: "Wi-Fi enabled ceiling light with voice control.",
    category: "lights",
    availability: true,
    dimentions: "25x25x5 cm"
  }
];

import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItempage(){
    const [items,setItem]=useState(sampleArr);
    return(
        <div className="w-full h-full relative">
            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Dimensions</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((product)=>{
                            console.log(product);
                            return(
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimentions}</td>
                                    <td>{product.availability ? "Available" : "Not Available"}</td>


                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
            <Link to="/admin/item/add">
             <CiCirclePlus className="text-[50px] absolute right-2 bottom-2 hover:text-red-900"/>
             </Link>
        </div>
    )
}