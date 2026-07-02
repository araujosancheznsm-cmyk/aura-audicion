
CREATE POLICY "Public view hearing-aids images" ON storage.objects
  FOR SELECT USING (bucket_id = 'hearing-aids');
CREATE POLICY "Admin insert hearing-aids images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hearing-aids' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update hearing-aids images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'hearing-aids' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete hearing-aids images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'hearing-aids' AND public.has_role(auth.uid(), 'admin'));
