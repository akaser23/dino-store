import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";

import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import './style.css';

function CategoryMenu() {
    const [state, dispatch] = useStoreContext();

    const { categories } = state;

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories
            });

            categoryData.categories.forEach(category => {
                idbPromise('categories', 'put', category);
            });
            
        } else if (!loading) {
            idbPromise('categories', 'get').then(categories => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories
                });
            });
        }
    }, [categoryData, loading, dispatch]);

    const handleClick = id => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id
        });
    };
    // const categories = categoryData?.categories || [];

    return (
        <div className="category-list">
            {/* <h2>Choose a Category:</h2> */}
            {categories.map(item => (
                <button
                    className="category-link"
                    key={item._id}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick(item._id);
                    }}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryMenu;