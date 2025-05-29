import React, { useState, useEffect } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
  Stack,
  Dropdown,
  Spinner,
  Text,
} from '@fluentui/react';
import { Pagination } from '@fluentui/react-experiments';
import { Dish } from '../../api/types';
import { getDishes } from '../../api/dishes';
import { useNavigate } from 'react-router-dom';
import './DishesList.css';

export const DishesList: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const columns: IColumn[] = [
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100 },
    { key: 'ingredients', name: 'Ingredients', fieldName: 'ingredients', minWidth: 150 },
    { key: 'diet', name: 'Diet', fieldName: 'diet', minWidth: 80 },
    { key: 'prep_time', name: 'Prep Time', fieldName: 'prep_time', minWidth: 80 },
    { key: 'cook_time', name: 'Cook Time', fieldName: 'cook_time', minWidth: 60 },
    { key: 'flavor_profile', name: 'Flavor', fieldName: 'flavor_profile', minWidth: 60 },
    { key: 'course', name: 'Course', fieldName: 'course', minWidth: 80 },
    { key: 'state', name: 'State', fieldName: 'state', minWidth: 80 },
    { key: 'region', name: 'Region', fieldName: 'region', minWidth: 80 },
  ];

  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      try {
        const response = await getDishes({
          page: currentPage,
          limit: itemsPerPage,
          sort: sortColumn,
          order: sortDirection,
          ...filters,
        });
        setDishes(response.data);
        setTotalItems(response.pagination.totalItems);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching dishes:', error);
        setDishes([]);
        setTotalItems(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [currentPage, sortColumn, sortDirection, filters, itemsPerPage]);

  const onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn) => {
    const newSortDirection =
      sortColumn === column.key ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';

    setSortColumn(column.key);
    setSortDirection(newSortDirection);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const handleRowClick = (item?: Dish) => {
    if (item) {
      navigate(`/dish/${encodeURIComponent(item.name)}`);
    }
  };

  if (loading && dishes.length === 0) {
    return <Spinner label="Loading dishes..." />;
  }

  return (
    <div className="dishes-list-container">
      <Stack tokens={{ childrenGap: 20 }}>
        <Stack horizontal tokens={{ childrenGap: 15 }} wrap className="filter-controls">
          <Dropdown
            placeholder="Filter by Diet"
            options={[
              { key: '', text: 'All' },
              { key: 'vegetarian', text: 'Vegetarian' },
              { key: 'non vegetarian', text: 'Non-Vegetarian' },
            ]}
            onChange={(e, option) => handleFilterChange('diet', option?.key as string)}
          />
          <Dropdown
            placeholder="Filter by Flavor"
            options={[
              { key: '', text: 'All' },
              { key: 'sweet', text: 'Sweet' },
              { key: 'spicy', text: 'Spicy' },
              { key: 'savory', text: 'Savory' },
            ]}
            onChange={(e, option) =>
              handleFilterChange('flavor_profile', option?.key as string)
            }
          />
        </Stack>

        <div className="dishes-table">
          <DetailsList
            items={dishes}
            columns={columns.map((col) => ({
              ...col,
              isSorted: col.key === sortColumn,
              isSortedDescending: sortDirection === 'desc',
              onColumnClick: onColumnClick,
            }))}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            onItemInvoked={handleRowClick}
          />
        </div>

        {dishes.length === 0 && !loading && (
          <Text variant="mediumPlus" styles={{ root: { textAlign: 'center' } }}>
            No dishes found for selected filters.
          </Text>
        )}

        <div className="pagination-container">
          <Pagination
            selectedPageIndex={currentPage - 1}
            itemsPerPage={itemsPerPage}
            totalItemCount={totalItems}
            pageCount={totalPages}
            onPageChange={(pageIndex) => setCurrentPage(pageIndex + 1)}
          />
        </div>
      </Stack>
    </div>
  );
};