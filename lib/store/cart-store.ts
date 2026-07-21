import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/types";

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (product: Product, variantId: string, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (product, variantId, quantity = 1) => {
        set((state) => {
          const existing = state.lines.find(
            (line) =>
              line.productId === product.id && line.variantId === variantId
          );
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line === existing
                  ? { ...line, quantity: line.quantity + quantity }
                  : line
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              { productId: product.id, variantId, quantity },
            ],
          };
        });
      },
      removeItem: (productId, variantId) => {
        set((state) => ({
          lines: state.lines.filter(
            (line) =>
              !(line.productId === productId && line.variantId === variantId)
          ),
        }));
      },
      setQuantity: (productId, variantId, quantity) => {
        set((state) => ({
          lines: state.lines
            .map((line) =>
              line.productId === productId && line.variantId === variantId
                ? { ...line, quantity }
                : line
            )
            .filter((line) => line.quantity > 0),
        }));
      },
      clear: () => set({ lines: [] }),
      totalItems: () =>
        get().lines.reduce((sum, line) => sum + line.quantity, 0),
    }),
    { name: "quickbite-cart" }
  )
);
