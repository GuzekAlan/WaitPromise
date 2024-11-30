import Auth from '@/components/Auth';
import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { YStack } from '@tamagui/stacks';
import { Paragraph } from '@tamagui/text';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'tamagui';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <SafeAreaView>
      <YStack>
      <View>
          <Auth />
          {session && session.user && <Paragraph>{session.user.id}</Paragraph>}
        </View>
      </YStack>
    </SafeAreaView>
  );
}