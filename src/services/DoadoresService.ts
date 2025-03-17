import { DoadorDTO } from "@dtos/DoadorDTO";
import { IDoador } from "@stores/entities/Doador";
import { api } from "./api";

export const DoadoresService = {
  getDoadores: async (): Promise<IDoador[]> => {
    const response = await api.request<IDoador[]>({
      method: "GET",
      url: "/doador",
    });
    return response.data;
  },
  addDoador: async (doador: DoadorDTO) => {
    await api.request({
      method: "POST",
      url: "/doador",
      data: doador,
    });
  },
  updateDoador: async (id: string, doador: DoadorDTO) => {
    await api.request({
      method: "PATCH",
      url: "/doador",
      data: doador,
      params: { id },
    });
  },
  deleteDoador: async (id: string) => {
    await api.request({
      method: "DELETE",
      url: "/doador",
      params: { id },
    });
  },
};
