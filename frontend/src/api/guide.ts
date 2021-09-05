import {useMutation, useQuery, useQueryClient} from "react-query";

type CreateGuideInput = {
  name: string;
  username: string;
  password: string;
  registryNumber: string;
  email: string;
  phone: string;
}

export function useGuides() {
  const queryClient = useQueryClient();

  const {data: guides = []} = useQuery('GUIDES', async () => {
    const res = await fetch('http://localhost:3000/v1/guide', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  })

  const toggleGuideActiveMutation = useMutation('TOGGLE_GUIDE_ACTIVE', async ({guideId, active}: any) => {
    const res = await fetch(`http://localhost:3000/v1/guide/${guideId}`, {
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
    onMutate: async ({guideId, active}) => {
      await queryClient.cancelQueries('GUIDES');

      queryClient.setQueryData('GUIDES', (old: any[] = []) => {
        return old.map(guide => {
          if(guide._id === guideId) {
            return {
              ...guide,
              active: !active
            }
          }

          return guide;
        })
      });
    }
  })

  const createGuideMutation = useMutation('CREATE_GUIDE', async (variables: CreateGuideInput) => {
    const res = await fetch(`http://localhost:3000/v1/guide`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: variables.name,
        username: variables.username,
        password: variables.password,
        registryNumber: variables.registryNumber,
        email: variables.email,
        phone: variables.phone,
      })
    });

    return await res.json();
  }, {
    onMutate: async (guide: CreateGuideInput) => {
      await queryClient.cancelQueries('GUIDES');

      const formattedGuide = {
        ...guide,
        active: true,
        password: ''
      };

      queryClient.setQueryData('GUIDES', (old: any[] = []) => {
        return [
          ...old,
          formattedGuide,
        ]
      });
    }
  })

  const resetPasswordMutation = useMutation('GUIDE_RESET_PASSWORD', async ({guideId, password}: any) => {
    const res = await fetch(`http://localhost:3000/v1/guide/${guideId}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password
      })
    });

    return await res.json();
  }, {
    onMutate: async ({guideId, active}) => {
      await queryClient.cancelQueries('GUIDES');

      queryClient.setQueryData('GUIDES', (old: any[] = []) => {
        return old.map(guide => {
          if(guide._id === guideId) {
            return {
              ...guide,
              isFirstLogin: false
            }
          }

          return guide;
        })
      });
    }
  })

  return {
    guides,
    toggleGuideActiveMutation,
    createGuideMutation,
    resetPasswordMutation
  }
}
