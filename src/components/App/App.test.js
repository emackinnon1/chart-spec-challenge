import { render, fireEvent, waitFor, act } from '@testing-library/react';
import App from './App';
import { getRestaurantData } from '../../shared/apiCalls';
import '@testing-library/jest-dom';

// jest.mock('../../shared/apiCalls');

describe('App', () => {
  describe('Integration test', () => {
    it('Renders App', async () => {
      const { getByText } = render(<App />);

      getRestaurantData();

      const searchBtn = await waitFor(() =>
        getByText('Search', { exact: false }),
      );

      const clearBtn = await waitFor(() =>
        getByText('Clear', { exact: false }),
      );

      const stateFilter = await waitFor(() =>
        getByText('All states', { exact: false }),
      );

      const genreFilter = await waitFor(() =>
        getByText('All genres', { exact: false }),
      );

      expect(clearBtn).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
      expect(stateFilter).toBeInTheDocument();
      expect(genreFilter).toBeInTheDocument();
    });

    it('should show restaurant data in table', async () => {
      const { getByText, debug } = render(<App />);
      getRestaurantData.mockResolvedValue(() => Promise.resolve(mockData));

      debug();
    });
  });
});
