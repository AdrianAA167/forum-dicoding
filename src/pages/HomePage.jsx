import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList';
import CategoryFilter from '../components/CategoryFilter';
import { asyncPopulateThreads } from '../states/threads/thunk';
import { setActiveCategory } from '../states/activeCategory/reducer';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const activeCategory = useSelector((state) => state.activeCategory);

  useEffect(() => {
    dispatch(asyncPopulateThreads());
  }, [dispatch]);

  const categories = useMemo(() => {
    const unique = new Set(threads.map((t) => t.category).filter(Boolean));
    return Array.from(unique);
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (!activeCategory) return threads;
    return threads.filter((t) => t.category === activeCategory);
  }, [threads, activeCategory]);

  return (
    <div className="page page--home">
      <h1 className="page__title">Daftar Thread</h1>
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={(category) => dispatch(setActiveCategory(category))}
        />
      )}
      <ThreadList threads={filteredThreads} users={users} />
    </div>
  );
}

export default HomePage;
