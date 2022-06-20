//кастомный хук отображения ошибок
import { useCallback } from "react";

//М - глобальная переменная, доступная из materialize, M.toast - метод выводит в браузерное окно
//переданное сообщение
export const useMessage = () => {
  return useCallback((text) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
};
