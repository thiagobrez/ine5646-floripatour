import {useMutation, useQueryClient} from "react-query";

export function useTourists() {
  const queryClient = useQueryClient();

  const createTouristMutation = useMutation('CREATE_TOURIST', async (variables: any) => {
    const res = await fetch(`https://floripatour.herokuapp.com/v1/tourist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: variables.name,
        username: variables.username,
        password: variables.password,
      }),
    });

    return await res.json();
  }, {
    onMutate: async () => {
      await queryClient.invalidateQueries('TOURS');
    }
  })

  return {
    createTouristMutation,
  }
}
