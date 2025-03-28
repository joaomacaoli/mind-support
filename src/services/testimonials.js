const apiUrl = import.meta.env.VITE_API_URL;

// console.log("API URL:", apiUrl);

export async function getAllTestimonials() {
  try {
    const response = await fetch(`${apiUrl}/testimonials`);
    if (!response.ok) {
      throw new Error("Erro ao buscar depoimentos");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar depoimentos:", error);
    return [];
  }
}

// export async function getAllUsers() {
//   try {
//     const response = await fetch(`${env}/users`, {
//       next: {
//         revalidate: 10,
//       },
//     });
//     const users = await response.json();
//     return users;
//   } catch (error) {
//     console.error(error);
//   }
// }
