"use client";

import { useEffect, useState } from "react";
import { fetchTasks } from "../services/tasksApi";

export const useFetch = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log("here now")
    const getData = async () => {
      try {
        const tasks = await fetchTasks();
        console.log("tasks", tasks);
        setData(tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading };
};
