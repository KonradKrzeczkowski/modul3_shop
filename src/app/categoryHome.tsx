import React from 'react'
import CategoryCard from '@/components/CategoryCard'

const cards =[{image:'/category/Frame6467.svg',name:'Mouse',id:1},
{image:'/category/Frame6467.svg',name:'Monitor',id:2},
{image:'/category/Frame6468.svg',name:'Headphone',id:3},
{image:'/category/Frame6472.svg',name:'Keyboard',id:4},
{image:'/category/Frame6475.svg',name:'Webcam',id:5}
]
const CategoryHome = () => {
  return (

    <div className="mb-25"><h1 className="text-[28px]  text-[var(--color-neutral-900)] mb-8">Category</h1>
      <div className="flex flex-row justify-between ">
{cards.map((card) => (
  <CategoryCard 
    key={card.id} 
    imageSrc={card.image} 
    name={card.name} 
  />
))}
     
      </div>
    </div>
  )
}

export default CategoryHome
