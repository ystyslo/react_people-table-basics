import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsPeopleLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  const preparedPeople = people.map(person => {
    const foundFather =
      people.find(fath => person.fatherName === fath.name) || null;
    const foundMother =
      people.find(moth => person.motherName === moth.name) || null;

    return {
      ...person,
      father: foundFather,
      mother: foundMother,
    };
  });

  const isErrorMessage = !isPeopleLoading && isError;
  const isNoPeopleOnServer = !isPeopleLoading && !people.length && !isError;
  const isLoadedPeople = !isPeopleLoading && !!people.length;

  return {
    preparedPeople,
    isErrorMessage,
    isNoPeopleOnServer,
    isLoadedPeople,
    isPeopleLoading,
  };
};
