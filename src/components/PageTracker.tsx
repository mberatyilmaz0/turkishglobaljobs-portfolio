'use client';

import { useEffect, useRef } from 'react';
import { incrementDailyVisit } from '@/actions/stats';

export default function PageTracker() {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      incrementDailyVisit();
      hasTracked.current = true;
    }
  }, []);

  return null;
}
