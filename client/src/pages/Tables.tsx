import React, { useEffect } from 'react';
import EnhancedTable from '../components/EnhancedTable';
import { LoadModal } from '../components/LoadModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeminars, selectEvent } from '../redux/slices/SeminarSlice';

import { RootState, AppDispatch } from "../redux/store";

export const Tables = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(selectEvent);

  useEffect(() => {
    dispatch(fetchSeminars()); 
  }, [dispatch]);

  
  if (!loading) return <LoadModal/>;
  if (error) return <p>{error}</p>;
  
  return (
    <div>
      <EnhancedTable/>
    </div>
  )
}
