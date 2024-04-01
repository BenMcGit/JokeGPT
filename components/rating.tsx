import React, { useCallback, useState } from 'react'
import { useCompletion } from 'ai/react';

type Evaluations = {
    funny: number;
    appropriate: number;
    offensive: number;
}

const StarRating = (props: { title: string, rating: number}) => {
    const { title, rating } = props;
    return (
        <div className="form-control">
        <label className="label">
          <span className="label-text">{title}</span>
        </label>
        <div className="rating rating-md">
            {[1,2,3,4,5].map(idx => <input type="radio" name={`rating-${title}`} readOnly className={`mask mask-star-2 ${rating >= idx ? 'bg-orange-800' : 'bg-slate-800'}`} />)}
        </div>
    </div>
    )
}

export default function Rating(props: { joke: string }) {
    const { joke } = props;
    const [funny, setFunny] = useState(-1);
    const [offensive, setOffensive] = useState(-1);
    const [appropriate, setAppropriate] = useState(-1);

    const { complete, isLoading, handleSubmit } = useCompletion({
        api: '/api/completion',
      });

      const checkAndPublish = useCallback(
        async (c: string) => {
          const completion = await complete(c);
          if (!completion) throw new Error('Failed to evaluate joke!');
          const evals = JSON.parse(completion) as Evaluations;
          if (!evals.appropriate || !evals.funny || !evals.offensive) {
            console.error('Unable to parse completion response');
            return
          }
          setFunny(evals.funny);
          setAppropriate(evals.appropriate);
          setOffensive(evals.offensive);
          return;
        },
        [complete],
      );

    if (isLoading) {
        return <span className="loading loading-dots loading-sm mt-8"></span>;
    }

    if ( funny === -1 || appropriate === -1 || offensive === -1 ) {
        return (
            <form onSubmit={handleSubmit} className='mt-8 max-w-32'>
                <button 
                    className="btn bg-blue-500 text-white btn-sm"
                    type='submit'
                    disabled={isLoading}
                    onClick={() => checkAndPublish(joke)}>
                    Evaluate Joke
                </button>
            </form>
        )
    }

  return (
    <div className='grid grid-cols-3 mt-8'>
        <StarRating title='Funny' rating={funny} />
        <StarRating title='Appropriate' rating={appropriate} />
        <StarRating title='Offensive' rating={offensive} />
    </div>
  )         
}
