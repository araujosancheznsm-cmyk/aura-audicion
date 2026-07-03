UPDATE public.hearing_aids
SET main_image_url = CASE
  WHEN type ILIKE 'CIC%' THEN '/hearing-aids/cic.jpg'
  WHEN type ILIKE 'ITC%' THEN '/hearing-aids/itc.jpg'
  WHEN type ILIKE '%Súper Potente%' OR type ILIKE '%Ultra Power%' OR type ILIKE '%Power Plus%' OR type ILIKE '%CROS%' THEN '/hearing-aids/bte-power.jpg'
  WHEN type ILIKE '%MiniRITE%' OR type ILIKE '%MiniBTE%' THEN '/hearing-aids/minirite.jpg'
  WHEN type ILIKE 'BTE%' THEN '/hearing-aids/bte-classic.jpg'
  ELSE '/hearing-aids/minirite.jpg'
END,
updated_at = now();