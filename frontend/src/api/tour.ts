import {useMutation, useQuery, useQueryClient} from "react-query";

import {useAppContext} from "../contexts/AppContext";

export type Tour = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  minTourists: number;
  maxTourists: number;
  active: boolean;
  availableDates: number[];
  comments: {
    _id: string;
    userId: string;
    tourId: string;
    text: string;
  }[];
  price: number;
};

export type CreateTourInput = {
  title: string;
  description: string;
  images: string[];
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  minTourists: number;
  maxTourists: number;
  availableDates: number[];
  price: number;
}

export function useTours() {
  const queryClient = useQueryClient();
  const {state: {loggedUser}} = useAppContext();

  const {data: tours = []} = useQuery<Tour[]>('TOURS', async () => {
    const url = 'https://floripatour.herokuapp.com/v1/tour';

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  })

  const toggleTourActiveMutation = useMutation('TOGGLE_TOUR_ACTIVE', async ({tourId, active}: any) => {
    const res = await fetch(`https://floripatour.herokuapp.com/v1/tour/${tourId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        active: !active
      })
    });

    return await res.json();
  }, {
    onMutate: async ({tourId, active}) => {
      await queryClient.cancelQueries('TOURS');

      queryClient.setQueryData('TOURS', (old: any[] = []) => {
        return old.map(tour => {
          if(tour._id === tourId) {
            return {
              ...tour,
              active: !active
            }
          }

          return tour;
        })
      });
    }
  })

  const createTourMutation = useMutation('CREATE_TOUR', async (formData: FormData) => {
    const res = await fetch(`https://floripatour.herokuapp.com/v1/tour`, {
      method: 'POST',
      body: formData,
    });

    return await res.json();
  }, {
    onMutate: async () => {
      await queryClient.invalidateQueries('TOURS');
    }
  })

  const createTourCommentMutation = useMutation('CREATE_TOUR_COMMENT', async ({tourId, userId, text}: any) => {
    const res = await fetch(`https://floripatour.herokuapp.com/v1/tourComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tourId,
        userId,
        text,
      }),
    });

    return await res.json();
  }, {
    onMutate: async ({tourId, userId, text}) => {
      await queryClient.invalidateQueries('TOURS');

      queryClient.setQueryData('TOURS', (old: any[] = []) => {
        return old.map(tour => {
          if(tour._id === tourId) {
            return {
              ...tour,
              comments: [
                ...tour.comments,
                {
                  tourId,
                  userId: {
                    _id: userId,
                    name: loggedUser?.name
                  },
                  text,
                }
              ]
            }
          }

          return tour;
        })
      });
    }
  })

  return {
    tours,
    toggleTourActiveMutation,
    createTourMutation,
    createTourCommentMutation,
  }
}
