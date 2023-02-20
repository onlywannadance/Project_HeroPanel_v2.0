import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import classNames from 'classnames';

import { useHttp } from '../../hooks/http.hook';
import { useGetFiltersQuery} from '../../api/apiSlice';
import { filtersChanged } from './filtersSlice';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {



    const {
        data: filters,
        isLoading,
        isError,
    } = useGetFiltersQuery();

    const {request} = useHttp();
    const {activeFilter} = useSelector(state => state.filtersReducer);
    const dispatch = useDispatch();

    const onUpdate = useCallback((name) => {
        dispatch(filtersChanged(name));
        // eslint-disable-next-line  
    }, [request]);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {

            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => onUpdate(name)}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;