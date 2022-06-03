import React, {useState, useEffect, useMemo,} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import classes from './index.module.css';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';
import Filters from './Filters';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData';
import logsNormalizer from '../../normalizers/logsNormalizer';
import dropDownsNormalizer from '../../normalizers/dropDownsNormalizer';
import ITEMS_PER_PAGE from '../../constants/PaginationItemsPerPage';

import { DROP_DOWN, TEXT, NUMBER, DATE } from '../../constants/inputTypes';
import {APPLICATION_TYPE, ACTION_TYPE} from '../../constants/requiredColumns';


const DataTable = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [dropDowns, setDropDowns] = useState({
    [APPLICATION_TYPE]: [],
    [ACTION_TYPE]: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({});
  const [sortBy, setSortBy] = useState({});
  const [filters, setFilters] = useState({
      userId: {
        label: "User Id",
        type: NUMBER,
        value: '',
      },
      actionType: {
        label: "Action type",
        type: DROP_DOWN,
        name: ACTION_TYPE,
        value: '',
      },
      applicationType : {
        label: "Application type",
        type: DROP_DOWN,
        name: APPLICATION_TYPE,
        value: '',
      },
      dateFrom : {
        label: "Date from",
        type: DATE,
        placeHolder: "select date",
        value: '',
        min: ''
      },
      dateTo: {
        label: "Date to",
        type: DATE,
        placeHolder: "select date",
        value: '',
        min: ''
      },
      applicationId: {
        label: "Application ID",
        type: NUMBER,
        value: ''
      }
  });

  useEffect(() => {
    setIsLoading(true);
    fetch('https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f')
    .then(res => res.json())
    .then(data => {
      const logsData = data.result.auditLog;
      setLogs(logsNormalizer(logsData));
      setDropDowns(dropDownsNormalizer(logsData));
      setIsLoading(false);
    })
    .catch(err => {
      alert(err);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (Object.keys(currentParams).length > 0) {
      const updatedFilters = {...filters};
      Object.keys(currentParams).forEach(paramKey => {
        const value = currentParams[paramKey];
        updatedFilters[paramKey] = {...updatedFilters[paramKey], value }
      });
      setFilters(updatedFilters);
    }
    setCurrentPage(1);
    setParams(currentParams);

  }, [searchParams]);

  useEffect(() => {
    if(Object.keys(params).length > 0) {
      const updatedLogs = [];
      logs.forEach(log => {
        let required = true;
        for (const paramKey in params) {
          if(paramKey === "dateTo" || paramKey === "dateFrom") {
            if (!log.creationTimestamp) {
              required = false;
              break;
            }
            const logDate = log.creationTimestamp.split(' ')[0];
            const paramDateTime = new Date(params[paramKey]).getTime();
            const logDateTime = new Date(logDate).getTime();
            if (paramKey === "dateFrom"  && logDateTime < paramDateTime) {
              required = false;
              break;
            }
            if (paramKey === "dateTo"  && logDateTime > paramDateTime) {
              required = false;
              break;
            }
          }
          else if (params[paramKey] != log[paramKey]) {
            required = false;
            break;
          }
        }

        if (required) updatedLogs.push({...log});
      });

      setFilteredLogs(updatedLogs);
    } else {
      setFilteredLogs(logs);
    }
  }, [logs, params]);


  const logsData = useMemo( () => {
    const requiredLogs = [...filteredLogs];
    
    if (sortBy.column) {
      if (sortBy.type === NUMBER) {
        requiredLogs.sort((logA, logB)=> {
          const logAVal = logA[sortBy.column],
                logBVal = logB[sortBy.column];
          if (logAVal === logBVal) return 0;
          if (logAVal === null || logAVal === undefined) return 1;
          if (logBVal === null || logBVal === undefined) return -1;
          return logAVal < logBVal ? -1 : 1;
        });

      } else if (sortBy.type === TEXT) {
        requiredLogs.sort((logA, logB)=> {
          let logAVal = logA[sortBy.column], 
              logBVal = logB[sortBy.column];
          if (typeof(logAVal) === "string") {
            logAVal = logAVal.replaceAll('_', ' ').toLowerCase();
          }
          if (typeof(logBVal) === "string") {
            logBVal = logBVal.replaceAll('_', ' ').toLowerCase();
          }
          if (logAVal === logBVal) return 0;
          if (logAVal === null || logAVal === undefined) return 1;
          if (logBVal === null || logBVal === undefined) return -1;
          return logAVal < logBVal ? -1 : 1;
        });

      } else if (sortBy.type === DATE) {
        requiredLogs.sort((logA, logB)=> {
          const logAVal = new Date(logA[sortBy.column]).getTime(), 
              logBVal = new Date(logB[sortBy.column]).getTime();
          if (logAVal === logBVal) return 0;
          if (logAVal === null || logAVal === undefined) return 1;
          if (logBVal === null || logBVal === undefined) return -1;
          return logAVal < logBVal ? -1 : 1;
        });
      }
    }
    return requiredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  }, [filteredLogs, currentPage, sortBy]);

  const onFilterChange = (key, value) => {
    if (key === "dateFrom") {
      setFilters(prevFilters => ({...prevFilters, [key]: {...prevFilters[key], value}, "dateTo": {...prevFilters["dateTo"], min: value} }));
    } else {
      setFilters(prevFilters => ({...prevFilters, [key]: {...prevFilters[key], value} }));
    }
  }

  const addQueryParams = () => {
    const query = [];
    Object.keys(filters).forEach(filterKey => {
      const value = filters[filterKey].value;
      if (value && value.length > 0) {
        query.push(`${filterKey}=${value}`)
      }
    });
    const queryStr = query.join('&');
    navigate(queryStr.length > 0 ? `/?${queryStr}` : '/');
  }

  if(isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Filters 
        filters= {filters} 
        dropDowns={dropDowns} 
        setStateCallBack={onFilterChange} 
        onSearch={addQueryParams}
      />
      {
        filteredLogs.length !== 0 ? (
        <>
        <table className={classes.Table}>
          <TableHeader sortingColumn={sortBy.column} setStateCallBack={setSortBy} />
          <TableBody data={logsData} />
        </table>
        <Pagination 
          total={filteredLogs.length} 
          itemsPerPage={ITEMS_PER_PAGE} 
          currentPage={currentPage} 
          onPageChange = {page => setCurrentPage(page)}
        />
        </>
        ) : (<NoData />)
      }
      
    </>
  );

};


export default DataTable;