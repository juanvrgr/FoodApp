import React from "react";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
      }

      // if(allRecipes > 9){
return (
    <nav className="btnPag">
        {pageNumbers &&
        pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
          ))}
    </nav>
)
        // } else if(allRecipes <= 9){
        //   return <div></div>
        // }
};